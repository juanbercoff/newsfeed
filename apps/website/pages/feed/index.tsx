import { getArticlesList } from '../../services/articles-api';
import { ArticlesResponseDto, AllArticlesLikesDto, Tag } from '@newsfeed/data';
import { useGetArticles } from '../../hooks/useArticles';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Spinner from '../../components/common/spinner';
import CardMobile from '../../components/feed/card-mobile';
import { useState } from 'react';
import ArticlesSorter from '../../components/feed/articles-sort';
import { GetArticleCondition } from '@newsfeed/data';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation('common');

  const {
    data: articlesData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetArticles(articles, condition, formatFilterTags());
  const { ref, inView } = useInView({
    delay: 200,
  });

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
        {!hasNextPage && <div className="px-2">{t('noMoreArticles')}</div>}
      </div>
    </>
  );
};

export async function getServerSideProps({ locale }) {
  const articles = await getArticlesList({ condition: 'latest' });
  return {
    props: {
      articles,
      ...(await serverSideTranslations(
        locale,
        ['common', 'top-bar'],
        nextI18NextConfig
      )),
    },
  };
}

export default Feed;
