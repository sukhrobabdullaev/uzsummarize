import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

// Initialize Gemini with timeout
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 2048,
  },
});

// Initialize OpenAI with timeout
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 8000, // 8 seconds timeout to stay under Vercel's 10s limit
});

// Maximum file size (5MB) - reduced to help with processing time
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Add AbortController for better timeout handling
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 8000);

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  const { success, resetAt } = await rateLimit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error: `After 2 requests, your limit will reset at ${resetAt}.`,
      },
      {
        status: 429,
      }
    );
  }

  let dbRequest;
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const mode = formData.get("mode") as string;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    // Create a new request record
    dbRequest = await prisma.request.create({
      data: {
        type: "IMAGE",
        content: `data:${file.type};base64,${base64Image.substring(0, 100)}...`, // Store first 100 chars of base64
        language: "uz",
        status: "PENDING",
      },
    });

    if (mode === "text") {
      try {
        // Text extraction using Gemini
        const startTime = Date.now();
        const prompt =
          "Extract all the text from this image. Return only the text, nothing else.";
        const result = await model.generateContent(
          [
            prompt,
            {
              inlineData: {
                data: base64Image,
                mimeType: file.type,
              },
            },
          ],
          { signal: controller.signal }
        );
        const response = await result.response;
        const text = response.text();
        const processingTime = Date.now() - startTime;

        await prisma.request.update({
          where: { id: dbRequest.id },
          data: {
            summary: text,
            processingTime,
            modelUsed: "gemini-1.5-flash",
            status: "COMPLETED",
          },
        });

        clearTimeout(timeout);
        return NextResponse.json({ text });
      } catch (error: unknown) {
        clearTimeout(timeout);
        if (error instanceof Error && error.name === "AbortError") {
          await prisma.request.update({
            where: { id: dbRequest.id },
            data: {
              status: "FAILED",
              error:
                "Request timed out. Please try again with a smaller image.",
            },
          });
          return NextResponse.json(
            {
              error:
                "Request timed out. Please try again with a smaller image.",
            },
            { status: 408 }
          );
        }
        console.error("Gemini API error:", error);

        await prisma.request.update({
          where: { id: dbRequest.id },
          data: {
            status: "FAILED",
            error: "Failed to extract text from image",
          },
        });

        return NextResponse.json(
          { error: "Failed to extract text from image" },
          { status: 500 }
        );
      }
    } else if (mode === "description") {
      try {
        // Image description using GPT-4 Vision
        const startTime = Date.now();
        const response = await openai.chat.completions.create(
          {
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "Describe this image in 4-5 sentences in Uzbek. Focus on the main subjects, colors, and any notable features.",
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:${file.type};base64,${base64Image}`,
                    },
                  },
                ],
              },
            ],
            max_tokens: 300,
          },
          { signal: controller.signal }
        );

        const description = response.choices[0].message.content;
        const processingTime = Date.now() - startTime;

        await prisma.request.update({
          where: { id: dbRequest.id },
          data: {
            summary: description,
            processingTime,
            modelUsed: "gpt-4o",
            status: "COMPLETED",
          },
        });

        clearTimeout(timeout);
        return NextResponse.json({ description });
      } catch (error: unknown) {
        clearTimeout(timeout);
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            await prisma.request.update({
              where: { id: dbRequest.id },
              data: {
                status: "FAILED",
                error:
                  "Request timed out. Please try again with a smaller image.",
              },
            });
            return NextResponse.json(
              {
                error:
                  "Request timed out. Please try again with a smaller image.",
              },
              { status: 408 }
            );
          }
          console.error("OpenAI API error:", error.message);

          await prisma.request.update({
            where: { id: dbRequest.id },
            data: {
              status: "FAILED",
              error: `OpenAI API error: ${error.message}`,
            },
          });

          return NextResponse.json(
            { error: `OpenAI API error: ${error.message}` },
            { status: 500 }
          );
        }
        console.error("Unknown error:", error);

        await prisma.request.update({
          where: { id: dbRequest.id },
          data: {
            status: "FAILED",
            error: "Failed to generate image description",
          },
        });

        return NextResponse.json(
          { error: "Failed to generate image description" },
          { status: 500 }
        );
      }
    } else {
      await prisma.request.update({
        where: { id: dbRequest.id },
        data: {
          status: "FAILED",
          error: "Invalid mode",
        },
      });
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }
  } catch (error) {
    clearTimeout(timeout);
    console.error("Error processing image:", error);

    if (dbRequest) {
      await prisma.request.update({
        where: { id: dbRequest.id },
        data: {
          status: "FAILED",
          error: "Failed to process image. Please try again later.",
        },
      });
    }

    return NextResponse.json(
      { error: "Failed to process image. Please try again later." },
      { status: 500 }
    );
  }
}
