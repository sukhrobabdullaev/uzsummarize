import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, content, language, maxLength, minLength } = body;

    const newRequest = await prisma.request.create({
      data: {
        type,
        content,
        language,
        maxLength,
        minLength,
        status: "PENDING",
      },
    });

    return NextResponse.json(newRequest);
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, summary, error, processingTime, modelUsed } = body;

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: {
        summary,
        error,
        processingTime,
        modelUsed,
        status: error ? "FAILED" : "COMPLETED",
      },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json(
      { error: "Failed to update request" },
      { status: 500 }
    );
  }
}
