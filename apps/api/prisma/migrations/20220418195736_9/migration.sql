-- DropForeignKey
ALTER TABLE "ArticleContent" DROP CONSTRAINT "ArticleContent_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- AlterTable
ALTER TABLE "ArticleContent" ADD COLUMN     "articleHistoryId" UUID,
ALTER COLUMN "articleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "articleHistoryId" UUID,
ALTER COLUMN "articleId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ArticleHistory" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "articleId" UUID NOT NULL,

    CONSTRAINT "ArticleHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleHistoryId_fkey" FOREIGN KEY ("articleHistoryId") REFERENCES "ArticleHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleContent" ADD CONSTRAINT "ArticleContent_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleContent" ADD CONSTRAINT "ArticleContent_articleHistoryId_fkey" FOREIGN KEY ("articleHistoryId") REFERENCES "ArticleHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleHistory" ADD CONSTRAINT "ArticleHistory_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
