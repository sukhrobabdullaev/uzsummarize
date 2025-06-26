import { NextResponse } from "next/server";

// If using Node.js 18+, fetch is global. Otherwise, uncomment below:
// import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export async function POST(req: Request) {
  try {
    const { content, difficulty } = await req.json();

    const systemMessage = `
      You are a study assistant. Given content and difficulty, generate a JSON in Uzbek with:
      {
        "mainConcepts": [...],
        "examples": [...],
        "keyPoints": [...],
        "summary": "..."
      }
      Keep answers concise.
    `;

    const userMessage = `Difficulty: ${difficulty}\nContent: ${content}`;

    const geminiRequestBody = {
      contents: [
        { role: "user", parts: [{ text: `${systemMessage.trim()}\n${userMessage}` }] }
      ]
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiRequestBody),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Gemini's response is in data.candidates[0].content.parts[0].text
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const notes = JSON.parse(text);

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error generating study notes:", error);
    return NextResponse.json(
      { error: "Failed to generate study notes" },
      { status: 500 }
    );
  }
}
