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
      <div className="max-h-lg bg-white cursor-pointer p-4 rounded-md shadow-md hover:shadow-lg hover:scale-[1.01] transition-all">
        <div className="flex justify-between items-start items-center space-x-8">
          <div className="flex flex-col space-y-3 flex-grow self-stretch justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold line-clamp-2 mb-2">
                {article.title}
              </h3>
              {!isXs ? (
                <p
                  className="text-sm line-clamp-4 break-all"
                  dangerouslySetInnerHTML={{ __html: article?.articleContent }}
                />
              ) : null}
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <div className="flex space-x-2 items-center">
                <Actions
                  countOfComments={!isLoading ? data : 0}
                  isArticle={true}
                  uiLikes={uiLikes}
                  like={hasBeenLiked?.like}
                  handleLike={handleLike}
                />
                <ArticleTags articleTag={article.articleTag} />
              </div>
              <ArticleAuthorInformation
                userProfile={article?.author?.profile}
                avatarSize={'sm'}
              />
            </div>
          </div>
          <div className="relative w-[80px] h-[80px] sm:w-[160px] sm:h-[160px] flex-shrink-0">
            <Image
              className="rounded-md"
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
