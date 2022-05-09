import CommentsList from '../../components/comments/comments-list';
import CommentForm from '../..//components/comments/comment-form';
import { getArticlesList, getOneArticle } from '../../services/articles-api';
import {
  ArticlesWithLikesResponseDto,
  ArticleHistoryDto,
} from '@newsfeed/data';
import ArticleContent from '../../components/article/article-content';
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

interface ArticleProps {
  article: ArticlesWithLikesResponseDto;
}

const Article = ({ article }: ArticleProps) => {
  const [showFirstLevel, setShowFirstLevel] = useState(false);
  const [showSecondLevel, setShowSecondLevel] = useState(false);
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

  const handleLevels = (shouldOpen: boolean) => {
    setShowFirstLevel(shouldOpen);
    setShowSecondLevel(shouldOpen);
  };

  const { isXl } = useBreakpoints();

  return (
    <ArticleContext.Provider value={articleVersionToDisplay}>
      <div className="relative space-y-3 p-6">
        <div className="static xl:fixed xl:block flex justify-center gap-2 items-baseline xl:top-[6.5rem] xl:right-44 xl:flex-col xl:items-baseline flex-wrap xl:space-y-2">
          <DepthSelector
            setActiveIndex={setActiveIndex}
            setShowFirstLevel={setShowFirstLevel}
            setShowSecondLevel={setShowSecondLevel}
            handleLevels={handleLevels}
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
            profileImageSize={30}
          />
          <div className="flex justify-between items-center gap-1">
            {visitsLoading ? <Spinner /> : visits?.[0]?._count?.id}
            <AiOutlineEye size={25} />
          </div>
        </div>
        <h1 className="font-bold lg:text-4xl text-2xl">{article.title}</h1>
        <div className="flex justify-center">
          <Image
            src={article.portraitImageUrl}
            objectFit="cover"
            alt="article picture"
            width={842}
            height={615}
          />
        </div>
        <div className="flex flex-row">
          <div>
            {articleVersionToDisplay.articleContent.map((articleContent) => (
              <ArticleContent
                key={articleContent.id}
                showFirstLevel={showFirstLevel}
                setShowFirstLevel={setShowFirstLevel}
                firstLevelContent={articleContent.level1}
                showSecondLevel={showSecondLevel}
                setShowSecondLevel={setShowSecondLevel}
                secondLevelContent={articleContent.level2}
                thirdLevelContent={articleContent.level3}
              />
            ))}
          </div>
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
