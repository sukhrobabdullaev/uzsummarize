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

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// -----------------------------
// Helpers
// -----------------------------

function validateMindmapData(data: any): data is { nodes: MindmapNode[] } {
  if (!data || !Array.isArray(data.nodes)) return false;
  return data.nodes.every(
    (node: any) =>
      typeof node.id === "string" &&
      typeof node.title === "string" &&
      typeof node.content === "string" &&
      (node.parentId === null || typeof node.parentId === "string") &&
      node.position &&
      typeof node.position.x === "number" &&
      typeof node.position.y === "number"
  );
}

function buildFewShotMessages(topic: string, difficulty: string) {
  return [
    {
      role: "system" as const,
      content:
        'Sen faqat bitta JSON obyektini qaytarasan. Hech qanday qo\'shimcha matn, markdown yoki izoh yozma. Tuzilma qat’iy: {"nodes":[{"id":string,"title":string,"content":string,"parentId":string|null,"position":{"x":number,"y":number}}]}',
    },

    // === FEW-SHOT EXAMPLE 1 ===
    {
      role: "user" as const,
      content:
        'Create a mindmap structure for the topic "Nyuton qonunlari" at "Boshlang’ich" level in Uzbek language.',
    },
    {
      role: "assistant" as const,
      content: JSON.stringify({
        nodes: [
          {
            id: "root",
            title: "Nyuton qonunlari",
            content: "3 asosiy qonun: inersiya, F=m·a, qarshi ta’sir.",
            parentId: null,
            position: { x: 0, y: 0 },
          },
          {
            id: "n1",
            title: "1-qonun: Inersiya",
            content: "Tashqi kuch bo‘lmasa, holat saqlanadi.",
            parentId: "root",
            position: { x: -240, y: 120 },
          },
          {
            id: "n2",
            title: "2-qonun: F = m·a",
            content: "Kuch massaga va tezlanishga bog‘liq.",
            parentId: "root",
            position: { x: 0, y: 150 },
          },
          {
            id: "n3",
            title: "3-qonun: Qarshi ta’sir",
            content: "Har bir ta’sirga teng va qarama-qarshi ta’sir bor.",
            parentId: "root",
            position: { x: 240, y: 120 },
          },
        ],
      }),
    },

    // === FEW-SHOT EXAMPLE 2 ===
    {
      role: "user" as const,
      content:
        'Create a mindmap structure for the topic "Matritsalar asoslari" at "O‘rta" level in Uzbek language.',
    },
    {
      role: "assistant" as const,
      content: JSON.stringify({
        nodes: [
          {
            id: "root2",
            title: "Matritsalar asoslari",
            content: "Turlar, amallar, qo‘llanishlar.",
            parentId: null,
            position: { x: 0, y: 0 },
          },
          {
            id: "a1",
            title: "Turlar",
            content: "Kvadrat, diagonal, birlik, nol.",
            parentId: "root2",
            position: { x: -260, y: 120 },
          },
          {
            id: "a2",
            title: "Amallar",
            content: "Qo‘shish, ko‘paytirish, transpozitsiya, determinant.",
            parentId: "root2",
            position: { x: 0, y: 150 },
          },
          {
            id: "a3",
            title: "Qo‘llanishlar",
            content: "Chiziqli tenglamalar, kompyuter grafikasi.",
            parentId: "root2",
            position: { x: 260, y: 120 },
          },
        ],
      }),
    },

    // === ACTUAL REQUEST ===
    {
      role: "user" as const,
      content: `Create a mindmap structure for the topic "${topic}" at "${difficulty}" level in Uzbek language.`,
    },
  ];
}

// -----------------------------
// GET - Fetch mindmap by ID
// -----------------------------
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

    const formatted: Mindmap = {
      ...mindmap,
      nodes: mindmap.nodes.map((node) => ({
        id: node.id,
        title: node.title,
        content: node.content,
        parentId: node.parentId,
        position: { x: node.positionX, y: node.positionY },
      })),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Fikrlar xaritasini olishda xatolik:", error);
    return NextResponse.json(
      { error: "Fikrlar xaritasini olishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

// -----------------------------
// POST - Create new mindmap (Few-shot)
// -----------------------------
export async function POST(request: NextRequest) {
  try {
    const { title, topic, difficulty } = await request.json();

    if (!title || !topic || !difficulty) {
      return NextResponse.json(
        { error: "Barcha maydonlar to'ldirilishi kerak" },
        { status: 400 }
      );
    }

    // Return existing by (topic, difficulty)
    const existing = await prisma.mindmap.findFirst({
      where: { topic, difficulty },
      include: { nodes: true },
    });
    if (existing) {
      const formatted: Mindmap = {
        ...existing,
        nodes: existing.nodes.map((node) => ({
          id: node.id,
          title: node.title,
          content: node.content,
          parentId: node.parentId,
          position: { x: node.positionX, y: node.positionY },
        })),
      };
      return NextResponse.json(formatted);
    }

    // Few-shot messages
    const messages = buildFewShotMessages(topic, difficulty);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const jsonText = completion.choices?.[0]?.message?.content ?? "{}";

    let mindmapData: unknown;
    try {
      mindmapData = JSON.parse(jsonText);
    } catch (e) {
      console.error("JSON parse error:", e, jsonText);
      return NextResponse.json(
        { error: "Model noto‘g‘ri JSON qaytardi" },
        { status: 502 }
      );
    }

    if (!validateMindmapData(mindmapData)) {
      return NextResponse.json(
        { error: "Yaratilgan fikrlar xaritasi noto'g'ri formatda" },
        { status: 500 }
      );
    }

    // Persist in DB
    const created = await prisma.mindmap.create({
      data: {
        title,
        topic,
        difficulty,
        nodes: {
          create: (mindmapData as { nodes: MindmapNode[] }).nodes.map(
            (node) => ({
              title: node.title,
              content: node.content,
              parentId: node.parentId,
              positionX: node.position.x,
              positionY: node.position.y,
            })
          ),
        },
      },
      include: { nodes: true },
    });

    const formatted: Mindmap = {
      ...created,
      nodes: created.nodes.map((node) => ({
        id: node.id,
        title: node.title,
        content: node.content,
        parentId: node.parentId,
        position: { x: node.positionX, y: node.positionY },
      })),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Fikrlar xaritasini yaratishda xatolik:", error);
    return NextResponse.json(
      { error: "Fikrlar xaritasini yaratishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

// -----------------------------
// PUT - Update mindmap
// -----------------------------
export async function PUT(request: NextRequest) {
  try {
    const { id, nodes } = await request.json();

    if (!id || !Array.isArray(nodes)) {
      return NextResponse.json(
        { error: "ID va tugunlar talab qilinadi" },
        { status: 400 }
      );
    }

    await prisma.mindmapNode.deleteMany({ where: { mindmapId: id } });

    const updated = await prisma.mindmap.update({
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

    const formatted: Mindmap = {
      ...updated,
      nodes: updated.nodes.map((node) => ({
        id: node.id,
        title: node.title,
        content: node.content,
        parentId: node.parentId,
        position: { x: node.positionX, y: node.positionY },
      })),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Fikrlar xaritasini yangilashda xatolik:", error);
    return NextResponse.json(
      { error: "Fikrlar xaritasini yangilashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

// -----------------------------
// DELETE - Delete mindmap
// -----------------------------
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
    await prisma.mindmap.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fikrlar xaritasini o'chirishda xatolik:", error);
    return NextResponse.json(
      { error: "Fikrlar xaritasini o'chirishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
