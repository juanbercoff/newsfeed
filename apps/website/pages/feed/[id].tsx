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
import { usePostArticleVisit } from '../../hooks/useArticleVisits';
import { useGetArticleHistory } from '../../hooks/useArticleHistory';
import DepthSelector from '../../components/article/depth-selector';
import VersionControl from '../../components/article/version-control';

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

  const { data } = useGetArticleHistory(article.id);

  useEffect(() => {
    mutate({ articleId: article.id });
  }, [mutate, article.id]);

  const handleLevels = (shouldOpen: boolean) => {
    setShowFirstLevel(shouldOpen);
    setShowSecondLevel(shouldOpen);
  };

  return (
    <ArticleContext.Provider value={article}>
      <div className="relative space-y-3 ">
        <div className="absolute top-0 right-[-240px]">
          <DepthSelector
            setActiveIndex={setActiveIndex}
            setShowFirstLevel={setShowFirstLevel}
            setShowSecondLevel={setShowSecondLevel}
            handleLevels={handleLevels}
            activeIndex={activeIndex}
          />
          <VersionControl
            article={article}
            articleHistory={data}
            articleVersionToDisplay={articleVersionToDisplay}
            setArticleVersionToDisplay={setArticleVersionToDisplay}
          />
        </div>

        <h1 className="font-bold text-center text-4xl">{article.title}</h1>
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
        <CommentForm />
        <CommentsList
          oldComments={
            'comments' in articleVersionToDisplay
              ? articleVersionToDisplay?.comments
              : null
          }
        />
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
