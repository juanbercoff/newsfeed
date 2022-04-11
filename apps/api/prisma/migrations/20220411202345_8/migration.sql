-- CreateTable
CREATE TABLE "ArticleVisit" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "articleId" UUID NOT NULL,
    "cookie" VARCHAR(255) NOT NULL,

    CONSTRAINT "ArticleVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleVisit" ADD CONSTRAINT "ArticleVisit_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
