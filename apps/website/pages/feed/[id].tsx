import CommentsList from '../../components/comments/comments-list';
import CommentForm from '../..//components/comments/comment-form';
import { getArticlesList, getOneArticle } from '../../services/articles-api';
import {
  ArticlesWithLikesResponseDto,
  ArticleHistoryDto,
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

const TEXT_SIZE = {
  level1: 'text-lg',
  level2: 'text-base',
  level3: 'text-sm',
  size0: 'text-[0]',
};

interface ArticleProps {
  article: ArticlesWithLikesResponseDto;
}
//FIX: dangerouslySetInnerHTML
const Article = ({ article }: ArticleProps) => {
  const [level2Elements, setLevel2Elements] = useState(null);
  const [level3Elements, setLevel3Elements] = useState(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { mutate } = usePostArticleVisit();
  const [articleVersionToDisplay, setArticleVersionToDisplay] = useState<
    ArticlesWithLikesResponseDto | ArticleHistoryDto
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
            userProfile={article.author.profile}
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
            dangerouslySetInnerHTML={{
              __html: articleVersionToDisplay.articleContent,
            }}
          />
        </div>
        {'comments' in articleVersionToDisplay ? null : <CommentForm />}
        <CommentsList />
      </div>
    </ArticleContext.Provider>
  );
};

export async function getStaticPaths() {
  const articles = await getArticlesList({});

  return {
    paths: articles.map((article) => ({ params: { id: article.id } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const article = await getOneArticle({ id: params.id });
  return {
    props: {
      article,
    },
  };
}

export default Article;
