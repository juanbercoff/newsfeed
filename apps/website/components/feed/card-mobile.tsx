import Image from 'next/image';
import Link from 'next/link';
import { ArticlesResponseDto, AllArticlesLikesDto } from '@newsfeed/data';
import Actions from '../common/actions';
import useBreakpoints from '../../hooks/useBreakpoints';
import ArticleTags from '../common/article-tags';
import ArticleAuthorInformation from '../common/article-author-information';
import { useGetCountOfComments } from '../../hooks/useComments';
import {
  useGetArticleIsLiked,
  useDeleteArticleLike,
  useUpdateArticleLike,
  useCreateArticleLike,
  useGetArticlesLikesCount,
} from '../../hooks/useArticleLikes';
import { useUserProfileContext } from '../../contexts/user-context';
import Skeleton from 'react-loading-skeleton';

interface CardProps {
  article: ArticlesResponseDto & { articleLike: AllArticlesLikesDto };
}

const CardMobile = ({ article }: CardProps) => {
  const { authToken } = useUserProfileContext();
  const { data, isLoading } = useGetCountOfComments(article.id);
  const {
    data: isArticleLiked,
    isLoading: articleLikeLoading,
    isIdle,
  } = useGetArticleIsLiked(article.id, authToken);
  const { data: articlesLikeCount } = useGetArticlesLikesCount(article.id);

  const { isXs } = useBreakpoints();
  const { mutate: createArticleLike } = useCreateArticleLike();
  const { mutate: updateArticleLike } = useUpdateArticleLike();
  const { mutate: deleteArticleLike } = useDeleteArticleLike();
  const handleLikeFunction = (like: boolean) => {
    const likeValue = like ? 1 : -1;
    if (isArticleLiked) {
      if (isArticleLiked?.like === likeValue) {
        deleteArticleLike({ articleLikeId: isArticleLiked.id, authToken });
      } else {
        updateArticleLike({
          like,
          articleLikeId: isArticleLiked?.id,
          authToken,
        });
      }
    } else {
      createArticleLike({ like, articleId: article.id, authToken });
    }
  };

  if (isLoading || articleLikeLoading || isIdle) {
    return <Skeleton height={isXs ? 111 : 168} />;
  }

  return (
    <Link href={`/feed/${article.id}`} passHref>
      <div className="bg-white cursor-pointer p-4 rounded-md shadow-md hover:shadow-lg hover:scale-[1.01] transition-all">
        <div className="flex justify-between items-start items-center space-x-8">
          <div className="flex flex-col space-y-3 flex-grow self-stretch justify-between">
            <div className="space-y-2">
              <ArticleAuthorInformation
                userName={article?.userName}
                articleCreatedDate={article.createdAt}
                avatarSize={'sm'}
              />
              <h3 className="text-lg sm:text-xl font-semibold line-clamp-2 mb-2">
                {article.title}
              </h3>
              {!isXs ? (
                <p
                  className="text-sm line-clamp-1 break-all"
                  dangerouslySetInnerHTML={{ __html: article?.articleContent }}
                />
              ) : null}
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <div className="flex space-x-2 items-center">
                <Actions
                  countOfComments={!isLoading ? data : 0}
                  isArticle={true}
                  handleLike={handleLikeFunction}
                  likeCount={articlesLikeCount?._sum?.like || 0}
                  isLiked={isArticleLiked?.like}
                />
                {article.tagName ? (
                  <div className="text-xs rounded-md px-1.5 py-0.5 w-fit text-black select-none bg-gray-200">
                    {article.tagName}{' '}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="relative w-[96px] h-[96px] sm:w-[160px] sm:h-[160px] flex-shrink-0">
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
