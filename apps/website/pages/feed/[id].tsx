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
import DepthSelector from '../../components/article/depth-selector';
import { useGetArticleHistory } from '../../hooks/useArticleHistory';

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
      <div className="space-y-3">
        <h1 className="font-bold text-center text-4xl">{article.title}</h1>
        <div className="flex justify-between">
          <DepthSelector
            setActiveIndex={setActiveIndex}
            setShowFirstLevel={setShowFirstLevel}
            setShowSecondLevel={setShowSecondLevel}
            handleLevels={handleLevels}
            activeIndex={activeIndex}
          />
          <div className="flex space-x-2">
            <p>Versiones anteriores</p>
            <p
              className="cursor-pointer"
              onClick={() => setArticleVersionToDisplay(article)}
            >
              Version Actual
            </p>
            {article.articleHistory.length > 0
              ? article.articleHistory.map((history, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center cursor-pointer"
                      onClick={() => setArticleVersionToDisplay(data[index])}
                    >
                      {`Version ${index + 1}`}
                    </div>
                  );
                })
              : null}
          </div>
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
