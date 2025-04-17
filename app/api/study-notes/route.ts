import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemMessage.trim() },
        { role: "user", content: userMessage },
      ],
    });

    const notes = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error generating study notes:", error);
    return NextResponse.json(
      { error: "Failed to generate study notes" },
      { status: 500 }
    );
  }
}
