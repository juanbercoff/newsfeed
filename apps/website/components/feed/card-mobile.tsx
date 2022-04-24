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
import Utils from '../../utils/Utils';
import useBreakpoints from '../../hooks/useBreakpoints';

interface CardProps {
  article: ArticleResponseDto & { articleLike: AllArticlesLikesDto };
}

const CardMobile = ({ article }: CardProps) => {
  const { uiLikes, hasBeenLiked, handleLike } = useLikes<ArticleLike>(
    article.id,
    article.articleLike?._sum.like,
    getUserArticleLike,
    deleteArticleLike,
    postArticleLike
  );
  const { isXs, isMd } = useBreakpoints();
  return (
    <Link href={`/feed/${article.id}`} passHref>
      <div className="flex justify-between items-start max-h-lg bg-white cursor-pointer p-4 items-center">
        <div className="flex flex-col space-y-1 grow-3 max-w-[240px] sm:max-w-[380px]">
          <p className="text-lg font-medium">{article.title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-md">{article.author.profile.userName}</p>
            <p className="text-sm text-gray-500">
              {Utils.formatDateRelative(article.createdAt)}
            </p>
          </div>
          {!isXs ? (
            <p className="text-md">
              {article.articleContent[0].level1.slice(0, 220) + '...'}
            </p>
          ) : null}
          <Actions
            countOfComments={article._count.comments}
            isArticle={true}
            uiLikes={uiLikes}
            like={hasBeenLiked?.like}
            handleLike={handleLike}
          />
        </div>
        <div className="relative w-[80px] h-[80px] sm:w-[160px] sm:h-[160px]">
          <Image
            src="/image.webp"
            layout="fill"
            objectFit="cover"
            alt="article picture"
          />
        </div>
      </div>
    </Link>
  );
};

export default CardMobile;
