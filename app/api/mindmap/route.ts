import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

interface MindmapNode {
  id: string;
  title: string;
  content: string;
  parentId: string | null;
  position: { x: number; y: number };
}

interface Mindmap {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  nodes: MindmapNode[];
  createdAt: Date;
  updatedAt: Date;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Validate mindmap data structure
function validateMindmapData(data: any): data is { nodes: MindmapNode[] } {
  if (!data || !Array.isArray(data.nodes)) return false;
  return data.nodes.every(
    (node: any) =>
      typeof node.id === "string" &&
      typeof node.title === "string" &&
      typeof node.content === "string" &&
      (node.parentId === null || typeof node.parentId === "string") &&
      typeof node.position === "object" &&
      typeof node.position.x === "number" &&
      typeof node.position.y === "number"
  );
}

// GET - Fetch mindmap by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Fikrlar xaritasi ID si talab qilinadi" },
      { status: 400 }
    );
  }

  try {
    const mindmap = await prisma.mindmap.findUnique({
      where: { id },
      include: { nodes: true },
    });

    if (!mindmap) {
      return NextResponse.json(
        { error: "Fikrlar xaritasi topilmadi" },
        { status: 404 }
      );
    }

    // Convert Prisma nodes to MindmapNode format
    const formattedMindmap: Mindmap = {
      ...mindmap,
      nodes: mindmap.nodes.map((node) => ({
        id: node.id,
        title: node.title,
        content: node.content,
        parentId: node.parentId,
        position: { x: node.positionX, y: node.positionY },
      })),
    };

    return NextResponse.json(formattedMindmap);
  } catch (error) {
    console.error("Fikrlar xaritasini olishda xatolik:", error);
    return NextResponse.json(
      { error: "Fikrlar xaritasini olishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

// POST - Create new mindmap
export async function POST(request: NextRequest) {
  
  try {
    const { title, topic, difficulty } = await request.json();

    if (!title || !topic || !difficulty) {
      return NextResponse.json(
        { error: "Barcha maydonlar to'ldirilishi kerak" },
        { status: 400 }
      );
    }

    // Generate initial mindmap structure using OpenAI
    const prompt = `Create a mindmap structure for the topic "${topic}" at ${difficulty} level in Uzbek language.
        Return a JSON object with the following structure:
        {
            "nodes": [
                {
                    "id": "unique_id",
                    "title": "node_title",
                    "content": "node_content",
                    "parentId": null,
                    "position": { "x": 0, "y": 0 }
                },
                // ... more nodes
            ]
        }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
    });

    const mindmapData = JSON.parse(
      completion.choices[0].message.content || "{}"
    );

    if (!validateMindmapData(mindmapData)) {
      return NextResponse.json(
        { error: "Yaratilgan fikrlar xaritasi noto'g'ri formatda" },
        { status: 500 }
      );
    }

    const existingMindmap = await prisma.mindmap.findFirst({
      where: { topic, difficulty },
      include: { nodes: true },
    });

    if (existingMindmap) {
      const formatted: Mindmap = {
        ...existingMindmap,
        nodes: existingMindmap.nodes.map((node) => ({
          id: node.id,
          title: node.title,
          content: node.content,
          parentId: node.parentId,
          position: { x: node.positionX, y: node.positionY },
        })),
      };
      return NextResponse.json(formatted);
    }

    // Create mindmap in database
    const mindmap = await prisma.mindmap.create({
      data: {
        title,
        topic,
        difficulty,
        nodes: {
          create: mindmapData.nodes.map((node: MindmapNode) => ({
            title: node.title,
            content: node.content,
            parentId: node.parentId,
            positionX: node.position.x,
            positionY: node.position.y,
          })),
        },
      },
      include: { nodes: true },
    });

    // Convert Prisma nodes to MindmapNode format
    const formattedMindmap: Mindmap = {
      ...mindmap,
      nodes: mindmap.nodes.map((node) => ({
        id: node.id,
        title: node.title,
        content: node.content,
        parentId: node.parentId,
        position: { x: node.positionX, y: node.positionY },
      })),
    };

    return NextResponse.json(formattedMindmap);
  } catch (error) {
    console.error("Fikrlar xaritasini yaratishda xatolik:", error);
    return NextResponse.json(
      { error: "Fikrlar xaritasini yaratishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

// PUT - Update mindmap
export async function PUT(request: NextRequest) {
  try {
    const { id, nodes } = await request.json();

    if (!id || !Array.isArray(nodes)) {
      return NextResponse.json(
        { error: "ID va tugunlar talab qilinadi" },
        { status: 400 }
      );
    }

    // Delete existing nodes
    await prisma.mindmapNode.deleteMany({
      where: { mindmapId: id },
    });

    // Create new nodes
    const mindmap = await prisma.mindmap.update({
      where: { id },
      data: {
        nodes: {
          create: nodes.map((node: MindmapNode) => ({
            title: node.title,
            content: node.content,
            parentId: node.parentId,
            positionX: node.position.x,
            positionY: node.position.y,
          })),
        },
      },
      include: { nodes: true },
    });

    // Convert Prisma nodes to MindmapNode format
    const formattedMindmap: Mindmap = {
      ...mindmap,
      nodes: mindmap.nodes.map((node) => ({
        id: node.id,
        title: node.title,
        content: node.content,
        parentId: node.parentId,
        position: { x: node.positionX, y: node.positionY },
      })),
    };

    return NextResponse.json(formattedMindmap);
  } catch (error) {
    console.error("Fikrlar xaritasini yangilashda xatolik:", error);
    return NextResponse.json(
      { error: "Fikrlar xaritasini yangilashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

// DELETE - Delete mindmap
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Fikrlar xaritasi ID si talab qilinadi" },
      { status: 400 }
    );
  }

  try {
    await prisma.mindmap.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fikrlar xaritasini o'chirishda xatolik:", error);
    return NextResponse.json(
      { error: "Fikrlar xaritasini o'chirishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
