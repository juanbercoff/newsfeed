export const allArticlesWithLikesQuery = (
  whereCondition: string,
  orderByCondition?: string
) => {
  return `
SELECT a.id,
a."createdAt",
a."updatedAt",
a."title",
a."articleContent",
up."userName",
up."firstName",
up."lastName",
COALESCE(al."likes", 0) as "likes",
c."countOfComments"
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
ORDER BY a."createdAt" desc
${whereCondition ? whereCondition : ''}
${orderByCondition ? orderByCondition : ''}`;
};
