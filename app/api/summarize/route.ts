import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

const MODELS = {
  GEMINI: {
    generate: async (text: string) => {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `Quyidagi matnni o'zbek tilida 5-6 gapdan iborat qisqa xulosasini yozing. Javobni to'g'ridan-to'g'ri xulosa matni bilan boshlang, kirish so'zlari yoki jumlalarsiz.\n\n${text}`;
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
  const { text } = await req.json();
  if (!text) {
    return NextResponse.json({ error: "No text provided" }, { status: 400 });
  }
  let dbRequest;
  try {
    dbRequest = await prisma.request.create({
      data: {
        type: "TEXT",
        content: text,
        language: "uz",
        status: "PENDING",
      },
    });
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
  } catch (error) {
    console.error(`GEMINI API error:`, error);
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
