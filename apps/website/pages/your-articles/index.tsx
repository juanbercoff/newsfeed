import { useGetUserArticles } from '../../hooks/useArticles';
import Spinner from '../../components/common/spinner';
import Utils from '../../utils/Utils';
import Button from '../../components/common/button';
import Link from 'next/link';

const YourArticles = () => {
  const { data: articles, isError, isLoading, status } = useGetUserArticles();

  if (isLoading || status === 'idle') {
    <Spinner />;
  }

  if (isError) {
    <h1>Error, intenta nuevamente</h1>;
  }

  return (
    <div className="flex flex-col">
      <p className="text-4xl font-bold mb-4">Tus articulos</p>
      <div className="divide-y">
        {articles?.map((article) => (
          <div key={article.id} className="flex py-4 justify-between grow">
            <div>
              <p className="text-lg font-bold">{article.title}</p>
              <p className="text-sm">
                {`Modificado por ultima vez el ${Utils.formatDateRelative(
                  article.updatedAt
                )}`}
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <Link
                href={{
                  pathname: `articles/edit/${article.id}`,
                }}
                passHref={true}
              >
                <Button use="primary" size="sm">
                  Editar
                </Button>
              </Link>
              <Button use="secondary" size="sm">
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourArticles;
