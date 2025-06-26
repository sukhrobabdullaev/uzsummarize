import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { urlRateLimit } from "@/lib/url-rate-limit";
import { prisma } from "@/lib/prisma";

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

  const { url } = await req.json();

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

    // Only Gemini model is used now
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(
      `Please summarize the following content in Uzbek: ${truncatedText}`
    );
    const geminiResponse = await result.response;
    summary = geminiResponse.text();

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
