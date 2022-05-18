export const allCommentWithLikesQuery = (
  whereCondition: string,
  orderByCondition?: string
) => {
  return `
SELECT c.id,
c."createdAt",
c."updatedAt",
c."content",
c."parentCommentId",
c."articleId",
c."articleHistoryId",
up."userName",
COALESCE(cl."likes", 0) as "likes"
FROM public."Comment" c
LEFT JOIN public."User" u ON u.id = c."authorId"
LEFT JOIN public."UserProfile" up ON up.id = u."profileId"
LEFT JOIN
  (
    SELECT
    cl."commentId" ,
    SUM(cl."like") AS "likes"
    FROM public."CommentLike" cl
    GROUP BY cl."commentId"
  ) AS cl
ON cl."commentId" = c."id"
${whereCondition ? whereCondition : ''}
${orderByCondition ? orderByCondition : ''}`;
};
