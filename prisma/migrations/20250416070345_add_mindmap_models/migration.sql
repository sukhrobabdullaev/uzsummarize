-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('TEXT', 'IMAGE');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Mindmap" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mindmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MindmapNode" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,
    "mindmapId" TEXT NOT NULL,

    CONSTRAINT "MindmapNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "type" "RequestType" NOT NULL,
    "content" TEXT NOT NULL,
    "language" TEXT,
    "maxLength" INTEGER,
    "minLength" INTEGER,
    "summary" TEXT,
    "error" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "processingTime" INTEGER,
    "modelUsed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MindmapNode" ADD CONSTRAINT "MindmapNode_mindmapId_fkey" FOREIGN KEY ("mindmapId") REFERENCES "Mindmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
