import CommentsList from '../../components/comments/comments-list';
import CommentForm from '../..//components/comments/comment-form';
import { getArticlesList, getOneArticle } from '../../services/articles-api';
import {
  ArticleResponseDto,
  ArticleHistoryDto,
  CreateArticleLikePayload,
  UpdateArticleLikePayload,
  DeleteArticleLikePayload,
} from '@newsfeed/data';
import { useEffect, useState } from 'react';
import { ArticleContext } from '../../contexts/article-context';
import {
  usePostArticleVisit,
  useGetArticleVisits,
} from '../../hooks/useArticleVisits';
import { useGetArticleHistory } from '../../hooks/useArticleHistory';
import DepthSelector from '../../components/article/depth-selector';
import VersionControlMobile from '../../components/article/version-control-mobile';
import VersionControl from '../../components/article/version-control';
import useBreakpoints from '../../hooks/useBreakpoints';
import Image from 'next/image';
import ArticleAuthorInformation from '../../components/common/article-author-information';
import { AiOutlineEye } from 'react-icons/ai';
import Spinner from '../../components/common/spinner';
import { useUserProfileContext } from '../../contexts/user-context';
import Actions from '../../components/common/actions';
import Utils from '../../utils/Utils';
import {
  useCreateArticleLike,
  useUpdateArticleLike,
  useDeleteArticleLike,
  useGetArticleIsLiked,
  useGetArticlesLikesCount,
} from '../../hooks/useArticleLikes';
import { useGetCountOfComments } from '../../hooks/useComments';
import { useRouter } from 'next/router';
import { ArticleLike } from '@prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

const TEXT_SIZE = {
  level1: 'text-lg',
  level2: 'text-base',
  level3: 'text-sm',
  size0: 'text-[0]',
};

interface ArticleProps {
  article: ArticleResponseDto;
}
//FIX: dangerouslySetInnerHTML
const Article = ({ article }: ArticleProps) => {
  const [level2Elements, setLevel2Elements] = useState(null);
  const [level3Elements, setLevel3Elements] = useState(null);
  const { authToken } = useUserProfileContext();
  const {
    data: isArticleLiked,
    isLoading: articleLikeLoading,
    isIdle,
  } = useGetArticleIsLiked(article.id, authToken);
  const { data: countOfComments, isLoading } = useGetCountOfComments(
    article.id
  );
  const { data: articlesLikeCount } = useGetArticlesLikesCount(article.id);
  const { push, pathname } = useRouter();

  const { mutate: createArticleLike } = useCreateArticleLike();
  const { mutate: updateArticleLike } = useUpdateArticleLike();
  const { mutate: deleteArticleLike } = useDeleteArticleLike();

  const handleLikeFunction = (like: boolean) =>
    Utils.handleLike<
      CreateArticleLikePayload,
      UpdateArticleLikePayload,
      DeleteArticleLikePayload,
      ArticleLike
    >(
      like,
      isArticleLiked,
      authToken,
      `/api/auth/login?returnTo=/${pathname}`,
      createArticleLike,
      updateArticleLike,
      deleteArticleLike,
      push,
      { like, articleId: article.id, authToken },
      { like, articleLikeId: isArticleLiked?.id, authToken },
      { articleLikeId: isArticleLiked?.id, authToken }
    );

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { mutate } = usePostArticleVisit();
  const [articleVersionToDisplay, setArticleVersionToDisplay] = useState<
    ArticleResponseDto | ArticleHistoryDto
  >(article);
  const { data: visits, isLoading: visitsLoading } = useGetArticleVisits(
    article.id
  );

  const { data } = useGetArticleHistory(article.id);

  useEffect(() => {
    mutate({ articleId: article.id });
  }, [mutate, article.id]);

  useEffect(() => {
    (function () {
      setActiveIndex(0);
      const level1Elements = document.getElementsByClassName('level1');
      const level2Elements = document.getElementsByClassName('level2');
      setLevel2Elements(level2Elements);
      const level3Elements = document.getElementsByClassName('level3');
      setLevel3Elements(level3Elements);
      setElementStyles(level2Elements);
      setElementStyles(level3Elements);
      Array.from(level1Elements).forEach((element: HTMLElement) => {
        element.classList.add('text-xl');
      });
    })();
  }, [articleVersionToDisplay]);

  const classListHandler = (
    elements: HTMLElement[],
    classToAdd: string,
    classToRemove: string
  ) => {
    Array.from(elements).forEach((element: HTMLElement) => {
      element.classList.remove(classToRemove);
      element.classList.add(classToAdd);
    });
  };

  const showSecondLevel = () => {
    classListHandler(level2Elements, TEXT_SIZE.level2, TEXT_SIZE.size0);
    classListHandler(level3Elements, TEXT_SIZE.size0, TEXT_SIZE.level3);
  };

  const showThirdLevel = () => {
    classListHandler(level2Elements, TEXT_SIZE.level2, TEXT_SIZE.size0);
    classListHandler(level3Elements, TEXT_SIZE.level3, TEXT_SIZE.size0);
  };

  const hideUpperLevels = () => {
    classListHandler(level2Elements, TEXT_SIZE.size0, TEXT_SIZE.level2);
    classListHandler(level3Elements, TEXT_SIZE.size0, TEXT_SIZE.level3);
  };

  const setElementStyles = (elements: HTMLCollectionOf<Element>) => {
    Array.from(elements).forEach((element: HTMLElement) => {
      element.classList.add('transition-all');
      element.classList.add('ease-linear');
      element.classList.add('duration-100');
      element.classList.add('text-[0]');
    });
  };

  const { isXl } = useBreakpoints();

  return (
    <ArticleContext.Provider value={articleVersionToDisplay}>
      <div className="relative space-y-3 sm:p-6 p-2">
        <div className="static xl:fixed xl:block flex justify-center gap-2 items-baseline xl:top-[6.5rem] xl:right-44 xl:flex-col xl:items-baseline flex-wrap xl:space-y-2">
          <DepthSelector
            setActiveIndex={setActiveIndex}
            setShowFirstLevel={showSecondLevel}
            setShowSecondLevel={showThirdLevel}
            hideUpperLevels={hideUpperLevels}
            activeIndex={activeIndex}
          />
          {isXl ? (
            <VersionControl
              article={article}
              articleHistory={data}
              articleVersionToDisplay={articleVersionToDisplay}
              setArticleVersionToDisplay={setArticleVersionToDisplay}
            />
          ) : (
            <VersionControlMobile
              article={article}
              articleHistory={data}
              articleVersionToDisplay={articleVersionToDisplay}
              setArticleVersionToDisplay={setArticleVersionToDisplay}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <ArticleAuthorInformation
            userName={article?.author.profile.userName}
            articleCreatedDate={article.createdAt}
            avatarSize="lg"
          />
          <div className="flex justify-between items-center gap-1">
            {visitsLoading ? <Spinner /> : visits?.[0]?._count?.id}
            <AiOutlineEye size={25} />
          </div>
        </div>
        <h1 className="font-bold lg:text-4xl text-2xl">{article.title}</h1>
        <div className="flex justify-center bg-slate-100 rounded-md">
          <Image
            src={article.portraitImageUrl}
            objectFit="cover"
            alt="article picture"
            width={589}
            height={448}
          />
        </div>
        <div>
          <div
            className="break-words"
            dangerouslySetInnerHTML={{
              __html: articleVersionToDisplay.articleContent,
            }}
          />
        </div>
        <Actions
          countOfComments={!isLoading ? countOfComments : 0}
          isArticle={true}
          handleLike={handleLikeFunction}
          likeCount={articlesLikeCount?._sum?.like || 0}
          isLiked={isArticleLiked?.like}
        />
        {'comments' in articleVersionToDisplay
          ? null
          : authToken && <CommentForm />}
        <CommentsList />
      </div>
    </ArticleContext.Provider>
  );
};

export async function getStaticPaths() {
  const articles = await getArticlesList({ condition: 'latest' });

  return {
    paths: articles.map((article) => ({ params: { id: article.id } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, locale }) {
  const article = await getOneArticle({ id: params.id });
  return {
    props: {
      article,
      ...(await serverSideTranslations(
        locale,
        ['common', 'top-bar', 'article'],
        nextI18NextConfig
      )),
    },
  };
}

export default Article;
