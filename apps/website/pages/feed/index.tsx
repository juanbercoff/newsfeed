import Card from '../../components/feed/card';
import { getArticlesList } from '../../services/articles-api';
import { ArticleWithAuthorResponseDto } from '@newsfeed/data';

type FeedProps = {
  articles: ArticleWithAuthorResponseDto[];
};

const Feed = ({ articles }: FeedProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {articles?.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const articles = await getArticlesList();
  return {
    props: {
      articles,
    },
  };
}

export default Feed;
