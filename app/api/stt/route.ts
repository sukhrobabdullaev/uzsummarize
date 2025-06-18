import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  const { success, resetAt } = await rateLimit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error: `Rate limit exceeded. Please try again later.`,
      },
      {
        status: 429,
      }
    );
  }

  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const language = (formData.get("language") as string) || "uz";

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Check file size (max 25MB for audio)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Audio file too large. Maximum size is 25MB." },
        { status: 400 }
      );
    }

    // Check file type
    if (!audioFile.type.startsWith("audio/")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an audio file." },
        { status: 400 }
      );
    }

    // Create a new request record
    const dbRequest = await prisma.request.create({
      data: {
        type: "TEXT",
        content: `Audio file: ${audioFile.name} (${audioFile.size} bytes) - Language: ${language}`,
        language: language,
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

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Convert audio file to base64 for Gemini
          const arrayBuffer = await audioFile.arrayBuffer();
          const base64Audio = Buffer.from(arrayBuffer).toString("base64");

          // Use Gemini's audio processing capabilities
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

          // Create the prompt based on language
          const languagePrompt =
            language === "uz"
              ? "Please transcribe this audio file in Uzbek language. Provide a clear, accurate transcription with proper punctuation and formatting. If there are multiple speakers, indicate them clearly. If the audio is unclear or contains background noise, note this in the transcription."
              : "Please transcribe this audio file in English. Provide a clear, accurate transcription with proper punctuation and formatting. If there are multiple speakers, indicate them clearly. If the audio is unclear or contains background noise, note this in the transcription.";

          const prompt = `${languagePrompt}

            Audio file: ${audioFile.name}
            File size: ${audioFile.size} bytes
            File type: ${audioFile.type}

            Please provide the transcription in ${
              language === "uz" ? "Uzbek" : "English"
            } language.`;

          // Create the content parts for Gemini
          const contentParts = [
            {
              text: prompt,
            },
            {
              inlineData: {
                mimeType: audioFile.type,
                data: base64Audio,
              },
            },
          ];

          // Generate content with streaming
          const result = await model.generateContent({
            contents: [{ role: "user", parts: contentParts }],
            generationConfig: {
              temperature: 0.1,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
            },
          });

          const response = await result.response;
          const transcription = response.text();

          // Simulate streaming by sending the text in chunks
          const words = transcription.split(" ");
          const chunkSize = 2; // Send 2 words at a time for realistic streaming

          for (let i = 0; i < words.length; i += chunkSize) {
            const chunk = words.slice(i, i + chunkSize).join(" ");
            const data = `data: ${JSON.stringify({ text: chunk + " " })}\n\n`;
            controller.enqueue(encoder.encode(data));

            // Add a realistic delay to simulate processing
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          // Send completion signal
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));

          // Update database
          const processingTime = Date.now() - startTime;
          await prisma.request.update({
            where: { id: dbRequest.id },
            data: {
              summary: transcription,
              processingTime,
              modelUsed: "gemini-2.0-flash",
              status: "COMPLETED",
            },
          });
        } catch (error) {
          console.error("STT processing error:", error);

          // Update database with error
          await prisma.request.update({
            where: { id: dbRequest.id },
            data: {
              status: "FAILED",
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to process audio",
            },
          });

          const errorData = `data: ${JSON.stringify({
            error: "Failed to process audio",
          })}\n\n`;
          controller.enqueue(encoder.encode(errorData));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("STT API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process audio",
      },
      { status: 500 }
    );
  }
}
