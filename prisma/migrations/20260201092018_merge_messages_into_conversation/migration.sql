-- AlterTable: Add messages column to Conversation
ALTER TABLE "Conversation" ADD COLUMN "messages" JSONB NOT NULL DEFAULT '[]';

-- Migrate existing messages into conversations
UPDATE "Conversation" c
SET messages = (
  SELECT COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'id', m.id,
        'role', m.role,
        'parts', m.parts
      ) ORDER BY m.sequence ASC
    ),
    '[]'::jsonb
  )
  FROM "Message" m
  WHERE m."conversationId" = c.id
);

-- DropTable: Drop Message table
DROP TABLE "Message";
