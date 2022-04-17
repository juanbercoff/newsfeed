import CommentsList from '../../components/comments/comments-list';
import CommentForm from '../..//components/comments/comment-form';
import { getArticlesList, getOneArticle } from '../../services/articles-api';
import { ArticlesWithLikesResponseDto } from '@newsfeed/data';
import ArticleContent from '../../components/feed/article-content';
import { useEffect, useState } from 'react';
import { ArticleContext } from '../../contexts/article-context';
import { usePostArticleVisit } from '../../hooks/useArticleVisits';
import { RiNumber0, RiNumber1, RiNumber2 } from 'react-icons/ri';
import LevelNumberIcon from '../../components/feed/LevelNumberIcon';

interface ArticleProps {
  article: ArticlesWithLikesResponseDto;
}

const Article = ({ article }: ArticleProps) => {
  const [showFirstLevel, setShowFirstLevel] = useState(false);
  const [showSecondLevel, setShowSecondLevel] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { mutate } = usePostArticleVisit();

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
        <div className="flex space-x-2 px-2">
          <p>Seleccionar complejidad</p>
          <LevelNumberIcon
            onClick={() => {
              setActiveIndex(0);
              handleLevels(false);
            }}
            Icon={RiNumber0}
            isActive={activeIndex === 0}
          />
          <LevelNumberIcon
            onClick={() => {
              setActiveIndex(1);
              setShowFirstLevel(true);
              setShowSecondLevel(false);
            }}
            Icon={RiNumber1}
            isActive={activeIndex === 1}
          />
          <LevelNumberIcon
            onClick={() => {
              setActiveIndex(2);
              handleLevels(true);
            }}
            Icon={RiNumber2}
            isActive={activeIndex === 2}
          />
        </div>
        <div className="flex flex-row">
          <div>
            {article.articleContent.map((articleContent) => (
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
