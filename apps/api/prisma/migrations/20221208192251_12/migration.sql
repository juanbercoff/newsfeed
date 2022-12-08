/*
  Warnings:

  - You are about to drop the `ArticleContent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `articleContent` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleContent` to the `ArticleHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArticleContent" DROP CONSTRAINT "ArticleContent_articleHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleContent" DROP CONSTRAINT "ArticleContent_articleId_fkey";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "articleContent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ArticleHistory" ADD COLUMN     "articleContent" TEXT NOT NULL;

-- DropTable
DROP TABLE "ArticleContent";
