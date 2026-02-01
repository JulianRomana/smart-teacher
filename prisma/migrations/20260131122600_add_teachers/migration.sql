/*
  Warnings:

  - Added the required column `teacherId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Conversation_sessionId_isArchived_idx";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "teacherId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "systemPrompt" TEXT NOT NULL,
    "avatarEmoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_name_key" ON "Teacher"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_slug_key" ON "Teacher"("slug");

-- CreateIndex
CREATE INDEX "Conversation_sessionId_teacherId_isArchived_idx" ON "Conversation"("sessionId", "teacherId", "isArchived");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
