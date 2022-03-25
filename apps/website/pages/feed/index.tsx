import Card from '../../components/feed/card';
import { getArticlesList } from '../../services/articles-api';
import { ArticleResponseDto, AllArticlesLikesDto } from '@newsfeed/data';
import { useUserProfileContext } from '../../contexts/user-context';
import { getAllArticlesLikes } from '../../services//article-likes-api';

interface FeedProps {
  articles: ArticleResponseDto[];
  articlesLikes: AllArticlesLikesDto[];
}

const Feed = ({ articles, articlesLikes }: FeedProps) => {
  const { authToken } = useUserProfileContext();
  console.log(authToken);

  const articlesWithLikes = articles.map((article) => {
    const articleLike = articlesLikes.find(
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
