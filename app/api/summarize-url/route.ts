import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { urlRateLimit } from "@/lib/url-rate-limit";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Function to truncate text to a maximum number of tokens
function truncateText(text: string, maxTokens: number = 15000): string {
  // Rough estimation: 1 token ≈ 4 characters
  const maxChars = maxTokens * 4;
  return text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  const { success, resetAt } = await urlRateLimit(ip);

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

  const { url, model = "gpt" } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  let dbRequest;
  try {
    // Create a new request record
    dbRequest = await prisma.request.create({
      data: {
        type: "TEXT",
        content: url,
        language: "uz",
        status: "PENDING",
      },
    });

    // Fetch the content from the URL
    const response = await fetch(url);
    const html = await response.text();

    // Extract text content from HTML and clean it
    const text = html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Truncate text to avoid token limits
    const truncatedText = truncateText(text);

    let summary = "";

    if (model === "gpt") {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that summarizes web content concisely in Uzbek.",
            },
            {
              role: "user",
              content: `Please summarize the following content in Uzbek: ${truncatedText}`,
            },
          ],
          model: "gpt-4o", // Using a more efficient model
          max_tokens: 500, // Limit output tokens
          temperature: 0.7,
        });

        summary = completion.choices[0].message.content || "";
      } catch (error: any) {
        if (error.response?.status === 429) {
          throw new Error(
            "The content is too long to process. Please try a shorter URL or use the Gemini model."
          );
        }
        throw error;
      }
    } else if (model === "gemini") {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(
        `Please summarize the following content in Uzbek: ${truncatedText}`
      );
      const response = await result.response;
      summary = response.text();
    }

    await prisma.request.update({
      where: { id: dbRequest.id },
      data: {
        summary,
        status: "COMPLETED",
      },
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error summarizing URL:", error);

    if (dbRequest) {
      await prisma.request.update({
        where: { id: dbRequest.id },
        data: {
          status: "FAILED",
          error:
            error instanceof Error ? error.message : "Failed to fetch summary",
        },
      });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch summary",
      },
      { status: 500 }
    );
  }
}
