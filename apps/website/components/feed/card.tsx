import Image from 'next/image';
import Link from 'next/link';
import { ArticleResponseDto, AllArticlesLikesDto } from '@newsfeed/data';
import Actions from '../common/actions';
import {
  deleteArticleLike,
  getUserArticleLike,
  postArticleLike,
} from '../../services/article-likes-api';
import { ArticleLike } from '@prisma/client';
import useLikes from '../../hooks/useLikes';
import { DateTime } from 'luxon';

interface CardProps {
  article: ArticleResponseDto & { articleLike: AllArticlesLikesDto };
}

const Card = ({ article }: CardProps) => {
  const { uiLikes, hasBeenLiked, handleLike } = useLikes<ArticleLike>(
    article.id,
    article.articleLike?._sum.like,
    getUserArticleLike,
    deleteArticleLike,
    postArticleLike
  );
  return (
    <Link href={`/feed/${article.id}`} passHref={true}>
      <div className="border flex justify-center flex-col items-start max-h-lg bg-white hover:cursor-pointer">
        <div className="relative w-full h-[350px]">
          <Image
            src="/image.webp"
            layout="fill"
            objectFit="cover"
            alt="news picture"
          />
        </div>

        <div className="p-4 space-y-2">
          <p className="text-3xl font-medium hover:text">{article.title}</p>

          <p className="text-sm text-gray-500 mt-2">
            {DateTime.fromISO(article.createdAt).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </p>

          <p className="text-lg">{article.author.profile.userName}</p>
          <Actions
            countOfComments={article._count.comments}
            isArticle={true}
            uiLikes={uiLikes}
            like={hasBeenLiked?.like}
            handleLike={handleLike}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
