import Card from '../../components/feed/card';
import { getArticlesList } from '../../services/articles-api';
import { ArticleResponseDto } from '@newsfeed/data';
import { useUserProfileContext } from '../../contexts/user-context';

interface FeedProps {
  articles: ArticleResponseDto[];
}

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
