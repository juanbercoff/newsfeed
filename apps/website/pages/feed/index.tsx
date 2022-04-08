import Card from '../../components/feed/card';
import { getArticlesList } from '../../services/articles-api';
import {
  ArticlesWithLikesResponseDto,
  AllArticlesLikesDto,
} from '@newsfeed/data';
import { useUserProfileContext } from '../../contexts/user-context';
import { getAllArticlesLikes } from '../../services//article-likes-api';
import { useGetArticles } from '../../hooks/useArticles';
import { useGetAllArticlesLikes } from '../../hooks/useArticleLikes';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Spinner from '../../components/common/spinner';

interface FeedProps {
  articles: ArticlesWithLikesResponseDto[];
  articlesLikes: AllArticlesLikesDto[];
}

const Feed = ({ articles, articlesLikes }: FeedProps) => {
  const { authToken } = useUserProfileContext();
  const {
    data: articlesData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetArticles(articles);
  const { data: likesData } = useGetAllArticlesLikes(articlesLikes);
  const { ref, inView } = useInView();
  console.log(articlesData);
  /*   const articlesWithLikes = articlesData.map((article) => {
    const articleLike = likesData.find(
      (articleLike) => articleLike.articleId === article.id
    );
    return { ...article, articleLike };
  }); */

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col space-y-4">
      {articlesData?.pages.map((page) =>
        page.map((article) => <Card key={article.id} article={article} />)
      )}
      <span className="invisible" ref={ref}>
        Intersection observer marker
      </span>
      {isFetchingNextPage && <Spinner />}
      {!hasNextPage && <div>No hay mas articulos</div>}
    </div>
  );
};

export async function getStaticProps() {
  const articles = await getArticlesList({});
  const articlesLikes = await getAllArticlesLikes();
  return {
    props: {
      articles,
      articlesLikes,
    },
  };
}

export default Feed;
