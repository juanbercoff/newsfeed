import Card from '../../components/feed/card';
import { getArticlesList } from '../../services/articles-api';
import {
  ArticlesWithLikesResponseDto,
  AllArticlesLikesDto,
} from '@newsfeed/data';
import { useUserProfileContext } from '../../contexts/user-context';
import { useGetArticles } from '../../hooks/useArticles';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Spinner from '../../components/common/spinner';

interface FeedProps {
  articles: ArticlesWithLikesResponseDto[];
  articlesLikes: AllArticlesLikesDto[];
}

const Feed = ({ articles }: FeedProps) => {
  useUserProfileContext();
  const {
    data: articlesData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetArticles(articles);
  const { ref, inView } = useInView();

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
  return {
    props: {
      articles,
    },
  };
}

export default Feed;
