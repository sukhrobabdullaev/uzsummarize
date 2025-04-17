import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 10000, // 10 seconds timeout for OpenAI requests
});

// Validate input data
function validateInputData(data: any): { isValid: boolean; error?: string } {
  if (!data) {
    return { isValid: false, error: "Ma'lumotlar talab qilinadi" };
  }

  const { topic, difficulty } = data;

  if (!topic || !difficulty) {
    return { isValid: false, error: "Barcha maydonlar to'ldirilishi kerak" };
  }

  if (typeof topic !== "string" || topic.length < 3) {
    return {
      isValid: false,
      error: "Mavzu kamida 3 ta belgidan iborat bo'lishi kerak",
    };
  }

  if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
    return { isValid: false, error: "Noto'g'ri daraja tanlandi" };
  }

  return { isValid: true };
}

// POST - Create new flashcards
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { isValid, error } = validateInputData(data);

    if (!isValid) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const { topic, difficulty } = data;

    // Generate flashcards using OpenAI
    const prompt = `Create 10 flashcards for the topic "${topic}" at ${difficulty} level in Uzbek language.
        Each flashcard should have a question on the front and an answer on the back.
        Return the response as a JSON object with a "flashcards" array containing the flashcards.
        Example format:
        {
            "flashcards": [
                {
                    "front": "What is the capital of Uzbekistan?",
                    "back": "Tashkent"
                }
            ]
        }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;

    if (!responseContent) {
      throw new Error("OpenAI response is empty");
    }

    let flashcardsData;
    try {
      const parsedResponse = JSON.parse(responseContent);

      // Ensure we have a flashcards array in the response
      if (
        !parsedResponse.flashcards ||
        !Array.isArray(parsedResponse.flashcards)
      ) {
        throw new Error(
          "OpenAI response does not contain a valid flashcards array"
        );
      }

      flashcardsData = parsedResponse.flashcards;

      // Validate each flashcard has the required fields
      flashcardsData = flashcardsData.filter(
        (card: any) =>
          card &&
          typeof card.front === "string" &&
          typeof card.back === "string"
      );

      if (flashcardsData.length === 0) {
        throw new Error("No valid flashcards found in the response");
      }
    } catch (error) {
      const parseError = error as Error;
      console.error("Error parsing OpenAI response:", parseError);
      throw new Error(`Failed to parse OpenAI response: ${parseError.message}`);
    }

    // Create flashcards in database
    try {
      const createdFlashcards = await prisma.$transaction(
        flashcardsData.map((card: { front: string; back: string }) =>
          prisma.flashcard.create({
            data: {
              front: card.front,
              back: card.back,
              topic,
              difficulty,
            },
          })
        )
      );

      return NextResponse.json(createdFlashcards);
    } catch (error) {
      const dbError = error as Error;
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }
  } catch (error) {
    console.error("Flashcardlarni yaratishda xatolik:", error);
    return NextResponse.json(
      {
        error: "Flashcardlarni yaratishda xatolik yuz berdi",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
