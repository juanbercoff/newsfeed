import { Injectable } from '@nestjs/common';
import { CreateArticleHistoryDto, ArticleHistoryDto } from '@newsfeed/data';
import { PrismaService } from '../prisma/prisma.service';
import { CommentLikesService } from '../comment-likes/comment-likes.service';

@Injectable()
export class ArticleHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateArticleHistoryDto) {
    return this.prisma.articleHistory.create({
      data: {
        articleContent: {
          connect: data.content.map((articleContent) => ({
            id: articleContent.id,
          })),
        },
        articleId: data.articleId,
        comments: {
          connect: data.comments.map((comment) => ({
            id: comment.id,
          })),
        },
      },
    });
  }

  async asyncgetArticleHistory(articleId: string) {
    return this.prisma.articleHistory.findMany({
      where: {
        articleId,
      },
      include: {
        articleContent: true,
        comments: {
          include: {
            likes: true,
          },
        },
      },
    });

    /* const articleHistoryWithCommentLikes = articleHistory.map((article) => {
      const articleComments = article.comments.map((comment) => {
        const _sum = comment.likes.reduce((sum, like) => sum + like.like, 0);
        return {
          ...comment,
          commentLike: {
            _sum: {
              like: _sum,
            },
          },
        };
      });
      return {
        ...article,
        comment
      }
    });
    console.log(articleHistoryWithCommentLikes);
    return articleHistoryWithCommentLikes; */
  }
}
