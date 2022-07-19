export const allArticlesWithLikesQuery = (
  orderByCondition?: string,
  offsetCondition?: string,
  limitCondition?: string
) => {
  return `
SELECT a.id,
a."createdAt",
a."updatedAt",
a."title",
a."articleContent",
a."portraitImageUrl",
up."userName",
up."firstName",
up."lastName",
COALESCE(al."likes", 0) as "likes",
COALESCE(c."countOfComments", 0) as "countOfComments",
at."tagName"
FROM public."Article" a
LEFT JOIN public."User" u ON u.id = a."authorId"
LEFT JOIN public."UserProfile" up ON up.id = u."profileId"
LEFT JOIN
  (
    SELECT
    al."articleId" ,
    SUM(al."like") AS "likes"
    FROM public."ArticleLike" al
    GROUP BY al."articleId"
  ) AS al
  ON al."articleId" = a."id"
LEFT JOIN
  (
    SELECT
    c."articleId",
    COUNT(c."id") AS "countOfComments"
    FROM public."Comment" c
    GROUP BY c."articleId"
  ) AS c
ON c."articleId" = a."id"
LEFT JOIN
  (
    SELECT
    at."articleId",
    t."name" as "tagName"
    FROM public."ArticleTag" at
    INNER JOIN 
      (
        SELECT
        t.id,
        t.name
        FROM public."Tag" t
      ) AS t
    ON t.id = at."tagId"
  ) AS at
ON at."articleId" = a."id"
${orderByCondition ? orderByCondition : ''}
${offsetCondition ? offsetCondition : ''}
`;
};
