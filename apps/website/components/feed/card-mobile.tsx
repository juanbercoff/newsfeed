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
import useBreakpoints from '../../hooks/useBreakpoints';
import ArticleTags from '../common/article-tags';
import ArticleAuthorInformation from '../common/article-author-information';
import { useGetCountOfComments } from '../../hooks/useComments';

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
  const { data, isLoading } = useGetCountOfComments(article.id);

  const { isXs } = useBreakpoints();
  return (
    <Link href={`/feed/${article.id}`} passHref>
      <div className="max-h-lg bg-white cursor-pointer p-4">
        <div className="flex space-x-1 flex-wrap">
          <ArticleTags articleTag={article.articleTag} />
        </div>
        <div className="flex justify-between items-start  items-center">
          <div className="flex flex-col space-y-1 grow-3 max-w-[230px] sm:max-w-[400px]">
            <p className="text-lg sm:text-xl font-medium line-clamp-2">
              {article.title}
            </p>
            <ArticleAuthorInformation
              userProfile={article?.author?.profile}
              profileImageSize={20}
            />
            {!isXs ? (
              <p className="text-md line-clamp-4">
                {article?.articleContent[0]?.level1}
              </p>
            ) : null}
            <Actions
              countOfComments={!isLoading ? data : 0}
              isArticle={true}
              uiLikes={uiLikes}
              like={hasBeenLiked?.like}
              handleLike={handleLike}
            />
          </div>
          <div className="relative w-[80px] h-[80px] sm:w-[160px] sm:h-[160px]">
            <Image
              src={article.portraitImageUrl}
              layout="fill"
              objectFit="cover"
              alt="article picture"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardMobile;
