import CommentsList from '../../components/comments/comments-list';
import CommentForm from '../..//components/comments/comment-form';
import { getArticlesList, getOneArticle } from '../../services/articles-api';
import { ArticleWithAuthorResponseDto } from '@newsfeed/data';

type ArticleProps = {
  article: ArticleWithAuthorResponseDto;
};

const Article = ({ article }: ArticleProps) => {
  return (
    <div className="space-y-8">
      <h1 className="font-bold text-center text-4xl">{article.title}</h1>
      <p
        className="mb-6 first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left"
      >
        {article.content}
      </p>
      <CommentForm />
      <CommentsList articleId={article.id} />
    </div>
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
