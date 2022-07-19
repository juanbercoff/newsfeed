import { getArticlesList } from '../../services/articles-api';
import { ArticlesResponseDto, AllArticlesLikesDto } from '@newsfeed/data';
import { useGetArticles } from '../../hooks/useArticles';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Spinner from '../../components/common/spinner';
import CardMobile from '../../components/feed/card-mobile';
import FilterBar from '../../components/feed/filter-bar';
import { useGetTags } from '../../hooks/useTags';
import { useState } from 'react';
import { Tag } from '@prisma/client';
import ArticlesSorter from '../../components/feed/articles-sort';
import { GetArticleCondition } from '@newsfeed/data';

interface FeedProps {
  articles: ArticlesResponseDto[];
  articlesLikes: AllArticlesLikesDto[];
}
//FIX multiple rerenders
const Feed = ({ articles }: FeedProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>();
  const [condition, setCondition] = useState<GetArticleCondition>('latest');
  const formatFilterTags = () => {
    return selectedTags?.map((tag) => `tags=${tag.name}`).join('&');
  };

  const {
    data: articlesData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetArticles(articles, condition, formatFilterTags());
  const { ref, inView } = useInView({
    delay: 200,
  });
  const { data: allTags, isLoading: allTagsIsLoading } = useGetTags();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <ArticlesSorter condition={condition} setCondition={setCondition} />
      <div className="relative flex flex-col space-y-2">
        {articlesData?.pages.map((page) =>
          page.map((article) => (
            <CardMobile key={article.id} article={article} />
          ))
        )}
        {
          <span className="invisible" ref={ref}>
            Intersection observer marker
          </span>
        }
        {isFetchingNextPage && <Spinner />}
        {!hasNextPage && <div className="px-2">No hay mas articulos</div>}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const articles = await getArticlesList({ condition: 'latest' });
  return {
    props: {
      articles,
    },
  };
}

export default Feed;
