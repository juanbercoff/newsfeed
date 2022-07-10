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
import CardMobile from '../../components/feed/card-mobile';
import FilterBar from '../../components/feed/filter-bar';
import { useGetTags } from '../../hooks/useTags';
import { useState } from 'react';
import { Tag } from '@prisma/client';

interface FeedProps {
  articles: ArticlesWithLikesResponseDto[];
  articlesLikes: AllArticlesLikesDto[];
}

const Feed = ({ articles }: FeedProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>();
  const formatFilterTags = () => {
    return selectedTags?.map((tag) => `tags=${tag.name}`).join('&');
  };

  const {
    data: articlesData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetArticles(articles, formatFilterTags());
  const { ref, inView } = useInView();
  const { data: allTags, isLoading: allTagsIsLoading } = useGetTags();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading || allTagsIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <FilterBar
        allTags={allTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <div className="relative flex flex-col space-y-4">
        {articlesData?.pages.map((page) =>
          page.map((article) => (
            <CardMobile key={article.id} article={article} />
          ))
        )}
        <span className="invisible" ref={ref}>
          Intersection observer marker
        </span>
        {isFetchingNextPage && <Spinner />}
        {!hasNextPage && <div>No hay mas articulos</div>}
      </div>
    </>
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
