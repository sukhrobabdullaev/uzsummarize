import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

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

    const openaiRequestBody = {
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemMessage.trim() },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    };

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(openaiRequestBody),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();

    // OpenAI's response is in data.choices[0].message.content
    const text = data?.choices?.[0]?.message?.content || "{}";
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
