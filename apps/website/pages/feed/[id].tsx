import CommentsList from '../../components/comments/comments-list';
import CommentForm from '../..//components/comments/comment-form';
import { getArticlesList, getOneArticle } from '../../services/articles-api';
import { ArticleResponseDto } from '@newsfeed/data';
import ArticleContent from '../../components/feed/article-content';
import { useState } from 'react';
import { ArticleContext } from '../../contexts/article-context';
import { useGetOneArticle } from '../../hooks/useArticles';

interface ArticleProps {
  article: ArticleResponseDto;
}

const Article = ({ article }: ArticleProps) => {
  const [showFirstLevel, setShowFirstLevel] = useState<boolean>(false);
  const [showSecondLevel, setShowSecondLevel] = useState(false);
  const { data: articleData } = useGetOneArticle({ id: article.id }, article);

  return (
    <ArticleContext.Provider value={articleData}>
      <div className="space-y-3">
        <h1 className="font-bold text-center text-4xl">{articleData.title}</h1>
        <ArticleContent
          showFirstLevel={showFirstLevel}
          setShowFirstLevel={setShowFirstLevel}
          showSecondLevel={showSecondLevel}
          setShowSecondLevel={setShowSecondLevel}
        />
        <ArticleContent
          showFirstLevel={showFirstLevel}
          setShowFirstLevel={setShowFirstLevel}
          showSecondLevel={showSecondLevel}
          setShowSecondLevel={setShowSecondLevel}
        />
        <CommentForm />
        <CommentsList />
      </div>
    </ArticleContext.Provider>
  );
};

export async function getStaticPaths() {
  const articles = await getArticlesList();

  return {
    paths: articles.map((article) => ({ params: { id: article.id } })),
    fallback: false,
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
