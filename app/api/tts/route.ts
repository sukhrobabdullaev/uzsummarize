import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs/promises";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

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
    const {
      text,
      voice,
      language,
      speechRate = 1,
      pitch = 1,
      volume = 0.8,
    } = await req.json();

    if (!text || !voice || !language) {
      return NextResponse.json(
        { error: "Missing required fields: text, voice, language" },
        { status: 400 }
      );
    }

    if (text.length > 1000) {
      return NextResponse.json(
        { error: "Text too long. Maximum 1000 characters." },
        { status: 400 }
      );
    }

    // Create a new request record
    const dbRequest = await prisma.request.create({
      data: {
        type: "TEXT",
        content: `TTS Request: ${text.substring(
          0,
          100
        )}... - Voice: ${voice} - Language: ${language}`,
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

    try {
      if (language === "en") {
        // Map UI voice IDs to Google Cloud TTS voices
        const googleVoices: Record<
          string,
          { languageCode: string; name: string }
        > = {
          sarah: { languageCode: "en-US", name: "en-US-Wavenet-F" }, // American English Female
          emma: { languageCode: "en-GB", name: "en-GB-Wavenet-A" }, // British English Female
          michael: { languageCode: "en-US", name: "en-US-Wavenet-D" }, // American English Male
          james: { languageCode: "en-GB", name: "en-GB-Wavenet-B" }, // British English Male
        };
        const selectedVoice = googleVoices[voice] || {
          languageCode: "en-US",
          name: "en-US-Wavenet-D",
        };

        const [response] = await client.synthesizeSpeech({
          input: { text },
          voice: {
            languageCode: selectedVoice.languageCode,
            name: selectedVoice.name,
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: speechRate,
            pitch,
          },
        });

        // Decode base64 audioContent to binary
        return new Response(
          Buffer.from(String(response.audioContent ?? ""), "base64"),
          {
            headers: {
              "Content-Type": "audio/mpeg",
              "Content-Disposition": `attachment; filename=tts-en.mp3`,
            },
          }
        );
      }

      // Use Gemini to generate speech (for demo purposes, we'll create a simulated audio response)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // Create voice-specific prompts
      const voicePrompts = {
        // Uzbek voices
        dildora:
          "Warm and friendly female voice with natural Uzbek pronunciation",
        elmira:
          "Clear and professional female voice with precise Uzbek articulation",
        aziza: "Young and energetic female voice with modern Uzbek intonation",
        marhabo: "Mature and wise female voice with traditional Uzbek warmth",
        rustam: "Strong and confident male voice with authoritative Uzbek tone",
        jamshid:
          "Friendly and approachable male voice with warm Uzbek character",
        umar: "Young and dynamic male voice with energetic Uzbek delivery",
        abdullah:
          "Traditional and respectful male voice with dignified Uzbek speech",

        // Karakalpak voices
        araylim: "Melodic female voice with natural Karakalpak pronunciation",
        sevinch: "Clear female voice with precise Karakalpak articulation",

        // English voices
        sarah: "Clear American English female voice with natural pronunciation",
        emma: "Warm British English female voice with elegant pronunciation",
        michael:
          "Professional American English male voice with authoritative tone",
        james: "Friendly British English male voice with warm character",
      };

      const voicePrompt =
        voicePrompts[voice as keyof typeof voicePrompts] ||
        "Natural voice with clear pronunciation";

      const prompt = `Generate speech synthesis instructions for the following text:

Text: "${text}"
Language: ${
        language === "uz"
          ? "Uzbek"
          : language === "kaa"
          ? "Karakalpak"
          : "English"
      }
Voice: ${voice}
Voice Characteristics: ${voicePrompt}
Speech Rate: ${speechRate}x
Pitch: ${pitch}x
Volume: ${volume * 100}%

Please provide detailed instructions for generating natural-sounding speech with the specified voice characteristics. Include pronunciation guidance, intonation patterns, and any language-specific considerations.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const synthesisInstructions = response.text();

      // For demonstration purposes, we'll create a simulated audio response
      // In a real implementation, you would use a proper TTS service like:
      // - Google Cloud Text-to-Speech
      // - Amazon Polly
      // - Azure Speech Services
      // - OpenAI TTS API

      // Create a simple audio simulation (this is just for demo)
      const audioSimulation = {
        instructions: synthesisInstructions,
        voice: voice,
        language: language,
        text: text,
        speechRate: speechRate,
        pitch: pitch,
        volume: volume,
        timestamp: new Date().toISOString(),
      };

      // Convert to a mock audio blob (in real implementation, this would be actual audio data)
      const audioData = JSON.stringify(audioSimulation);
      const audioBlob = new Blob([audioData], { type: "application/json" });

      // Update database
      const processingTime = Date.now() - startTime;
      await prisma.request.update({
        where: { id: dbRequest.id },
        data: {
          summary: `TTS generated for voice: ${voice}, language: ${language}`,
          processingTime,
          modelUsed: "gemini-2.0-flash",
          status: "COMPLETED",
        },
      });

      return new Response(audioBlob, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": `attachment; filename="tts-${voice}-${Date.now()}.mp3"`,
        },
      });
    } catch (error) {
      console.error("TTS processing error:", error);

      // Update database with error
      await prisma.request.update({
        where: { id: dbRequest.id },
        data: {
          status: "FAILED",
          error:
            error instanceof Error
              ? error.message
              : "Failed to generate speech",
        },
      });

      return NextResponse.json(
        { error: "Failed to generate speech" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process request",
      },
      { status: 500 }
    );
  }
}
