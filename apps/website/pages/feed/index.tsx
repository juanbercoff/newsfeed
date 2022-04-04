import Card from '../../components/feed/card';
import { getArticlesList } from '../../services/articles-api';
import { ArticleResponseDto, AllArticlesLikesDto } from '@newsfeed/data';
import { useUserProfileContext } from '../../contexts/user-context';
import { getAllArticlesLikes } from '../../services//article-likes-api';
import { useGetArticles } from '../../hooks/useArticles';
import { useGetAllArticlesLikes } from '../../hooks/useArticleLikes';

interface FeedProps {
  articles: ArticleResponseDto[];
  articlesLikes: AllArticlesLikesDto[];
}

const Feed = ({ articles, articlesLikes }: FeedProps) => {
  const { authToken } = useUserProfileContext();
  const { data: articlesData } = useGetArticles(articles);
  const { data: likesData } = useGetAllArticlesLikes(articlesLikes);

  const articlesWithLikes = articlesData.map((article) => {
    const articleLike = likesData.find(
      (articleLike) => articleLike.articleId === article.id
    );
    return { ...article, articleLike };
  });

  return (
    <div className="flex flex-col space-y-4">
      {articlesWithLikes?.map((article) => (
        <Card key={article.id} article={article} />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const articles = await getArticlesList();
  const articlesLikes = await getAllArticlesLikes();
  return {
    props: {
      articles,
      articlesLikes,
    },
  };
}

export default Feed;
