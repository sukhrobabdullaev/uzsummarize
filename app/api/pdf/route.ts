// app/api/summarize/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import pdfParse from "pdf-parse";

// Basic check at module load time (won't catch if missing at runtime, but good first check)
if (!process.env.GOOGLE_API_KEY) {
  console.error(
    "FATAL: GOOGLE_API_KEY is not defined in environment variables AT STARTUP."
  );
  // Note: Throwing here might stop the server. Logging might be safer initially.
}

const ALLOWED_MODELS = ["GPT-4-TURBO", "GEMINI-1.5-FLASH"] as const;
type ModelType = (typeof ALLOWED_MODELS)[number];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface PDFParseResult {
  text: string;
  numpages: number;
  numrender: number;
  info: {
    PDFFormatVersion: string;
    IsAcroFormPresent: boolean;
    IsXFAPresent: boolean;
    [key: string]: string | boolean | number;
  };
  metadata: {
    [key: string]: string | number | boolean | null;
  };
  version: string;
}

export async function POST(request: NextRequest) {
  console.log("API Route /api/summarize hit"); // Log entry

  // --- Ensure API Key is available at runtime ---
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("Error: GOOGLE_API_KEY is missing at runtime.");
    return NextResponse.json(
      { error: "Server configuration error: API key missing." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const model = formData.get("model") as ModelType;

    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (!model || !ALLOWED_MODELS.includes(model)) {
      return NextResponse.json(
        { error: "Invalid model specified" },
        { status: 400 }
      );
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF with proper error handling
    let pdfText: string;
    try {
      const data = (await pdfParse(buffer)) as PDFParseResult;
      pdfText = data.text;

      if (!pdfText || pdfText.trim().length === 0) {
        return NextResponse.json(
          { error: "Could not extract text from PDF or PDF is empty" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("PDF parsing error:", error);
      return NextResponse.json(
        { error: "Failed to parse PDF file" },
        { status: 500 }
      );
    }

    const maxLength = model === "GEMINI-1.5-FLASH" ? 100000 : 12000;
    const textToSummarize = pdfText.substring(0, maxLength);

    let summary: string;
    const prompt = `Please summarize this PDF content concisely in 5-6 sentences:\n\n${textToSummarize}`;

    if (model === "GEMINI-1.5-FLASH") {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const genModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await genModel.generateContent(prompt);
      summary = (await result.response).text();
    } else {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: "You are a helpful PDF summarizer." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 300,
      });
      summary =
        response.choices[0]?.message?.content ?? "Failed to generate summary";
    }

    if (!summary) {
      return NextResponse.json(
        { error: "Failed to generate summary" },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
