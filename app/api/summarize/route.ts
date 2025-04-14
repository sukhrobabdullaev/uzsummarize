import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const MODELS = {
  GPT: {
    url: "https://api.openai.com/v1/chat/completions",
    headers: () => ({
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    }),
    body: (text: string) => ({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Please provide a brief summary of the text in 5-6 sentences in Uzbek",
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 300,
      temperature: 0.5,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    }),
  },
  GEMINI: {
    generate: async (text: string) => {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Please provide a brief summary of the text in 5-6 sentences in Uzbek:

          ${text}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    },
  },
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

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

  const { text, model = "GPT" } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "No text provided" }, { status: 400 });
  }

  const selectedModel = MODELS[model as keyof typeof MODELS];
  if (!selectedModel) {
    return NextResponse.json(
      { error: "Invalid model selected" },
      { status: 400 }
    );
  }

  let dbRequest;
  try {
    // Create a new request record
    dbRequest = await prisma.request.create({
      data: {
        type: "TEXT",
        content: text,
        language: "uz",
        status: "PENDING",
      },
    });

    if (model === "GEMINI") {
      if (!process.env.GEMINI_API_KEY) {
        await prisma.request.update({
          where: { id: dbRequest.id },
          data: {
            status: "FAILED",
            error: "Gemini API key not configured",
          },
        });
        return NextResponse.json(
          { error: "Gemini API key not configured" },
          { status: 500 }
        );
      }
      const startTime = Date.now();
      const summary = await MODELS.GEMINI.generate(text);
      const processingTime = Date.now() - startTime;

      await prisma.request.update({
        where: { id: dbRequest.id },
        data: {
          summary,
          processingTime,
          modelUsed: "gemini-2.0-flash",
          status: "COMPLETED",
        },
      });

      return NextResponse.json({ summary });
    }

    // Handle GPT case
    if (!process.env.OPENAI_API_KEY) {
      await prisma.request.update({
        where: { id: dbRequest.id },
        data: {
          status: "FAILED",
          error: "OpenAI API key not configured",
        },
      });
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const startTime = Date.now();
    const response = await fetch(MODELS.GPT.url, {
      method: "POST",
      headers: MODELS.GPT.headers(),
      body: JSON.stringify(MODELS.GPT.body(text)),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GPT API error response:", errorData);

      await prisma.request.update({
        where: { id: dbRequest.id },
        data: {
          status: "FAILED",
          error: `API error: ${
            errorData.error?.message || response.statusText
          }`,
        },
      });

      return NextResponse.json(
        {
          error: `API error: ${
            errorData.error?.message || response.statusText
          }`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content;
    const processingTime = Date.now() - startTime;

    await prisma.request.update({
      where: { id: dbRequest.id },
      data: {
        summary,
        processingTime,
        modelUsed: "gpt-4o-mini",
        status: "COMPLETED",
      },
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error(`${model} API error:`, error);

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
