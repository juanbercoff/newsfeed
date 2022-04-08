/*
  Warnings:

  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "content";

-- CreateTable
CREATE TABLE "ArticleContent" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "level1" VARCHAR NOT NULL,
    "level2" VARCHAR NOT NULL,
    "level3" VARCHAR NOT NULL,
    "articleId" UUID NOT NULL,

    CONSTRAINT "ArticleContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleContent" ADD CONSTRAINT "ArticleContent_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
