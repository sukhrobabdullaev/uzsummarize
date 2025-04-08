import OpenAI from "openai";
import { PDFDocument } from "pdf-lib";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

interface SummarizeInput {
  text?: string;
  file?: File;
  analyzeImage?: boolean;
}

interface RateLimitData {
  requests: { timestamp: number }[]; // Store timestamps of each request
}

// Rate limit settings
const MAX_REQUESTS = 5; // Max 5 requests
const TIME_WINDOW = 30 * 60 * 1000; // 30 minutes in milliseconds

const checkRateLimit = (): void => {
  const now = Date.now();

  const rateLimitData: RateLimitData = JSON.parse(
    localStorage.getItem("rateLimit") || '{"requests": []}'
  );

  // Filter out requests older than 30 minutes
  rateLimitData.requests = rateLimitData.requests.filter(
    (req) => now - req.timestamp <= TIME_WINDOW
  );

  // Check if the limit is exceeded
  if (rateLimitData.requests.length >= MAX_REQUESTS) {
    throw new Error(
      "Rate limit exceeded: Only 5 requests allowed per 30 minutes. Please wait and try again."
    );
  }

  // Add the current request timestamp
  rateLimitData.requests.push({ timestamp: now });
  localStorage.setItem("rateLimit", JSON.stringify(rateLimitData));
};

export const summarizeText = async ({
  text,
  file,
  analyzeImage = false,
}: SummarizeInput): Promise<string> => {
  // Check and enforce rate limit before proceeding
  checkRateLimit();

  try {
    let contentToSummarize = "";

    if (text && !analyzeImage) {
      contentToSummarize = text;
    }

    if (file) {
      const fileType = file.type;
      const fileName = file.name.toLowerCase();

      if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
        contentToSummarize = await extractTextFromPDF(file);
      } else if (
        fileType.startsWith("image/") ||
        /\.(png|jpg|jpeg)$/i.test(fileName)
      ) {
        contentToSummarize = await extractTextFromImage(file);
      } else {
        throw new Error("Unsupported file type.");
      }
    }

    if (!contentToSummarize) {
      throw new Error("No content provided for summarization");
    }

    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant that summarizes text in Uzbek.",
      },
      {
        role: "user",
        content: `Summarize the following text in Uzbek: ${contentToSummarize}`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 150,
      temperature: 0.7,
    });

    return (
      completion.choices[0]?.message?.content?.trim() || "No summary generated"
    );
  } catch (error) {
    console.error("Error in summarizeText:", error);
    throw error; // Re-throw the error for the caller to handle (e.g., show a toast)
  }
};

// Existing extractTextFromImage function (unchanged)
const extractTextFromImage = async (file: File): Promise<string> => {
  try {
    const base64Image = await fileToBase64(file);
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Extract the text from this image." },
            { type: "image_url", image_url: { url: base64Image } },
          ],
        },
      ],
    });
    return response.choices[0]?.message?.content || "No text extracted";
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error("Failed to extract text from image");
  }
};

// Existing extractTextFromPDF function (unchanged)
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const pdfDoc = await PDFDocument.load(reader.result as ArrayBuffer);
          const pages = pdfDoc.getPages();
          const textContent = await Promise.all(
            pages.map((page) => page.getTextContent())
          );

          const extractedText = textContent
            .map((content) => content.items.map((item) => item.str).join(" "))
            .join("\n");

          resolve(extractedText.trim());
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  } catch (error) {
    throw new Error("Failed to extract text from PDF.");
  }
};

// Existing fileToBase64 function (unchanged)
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      if (!result.startsWith("data:image/")) {
        reject(new Error("Invalid base64 data: Missing data URL prefix"));
      }
      resolve(result);
    };
    reader.onerror = (error) => reject(new Error(`FileReader error: ${error}`));
  });
};
