import { useState } from 'react';
import { useGetUserArticles, useDeleteArticle } from '../../hooks/useArticles';
import Spinner from '../../components/common/spinner';
import Utils from '../../utils/Utils';
import Button from '../../components/common/button';
import Link from 'next/link';
import Modal from '../../components/common/modal';
import { useUserProfileContext } from '../../contexts/user-context';

const YourArticles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState<string | null>(
    null
  );
  const { authToken } = useUserProfileContext();
  const {
    data: articles,
    isError,
    isLoading,
    status,
  } = useGetUserArticles(authToken);
  const { mutate } = useDeleteArticle();

  const handleDelete = () => {
    mutate({ articleId: articleIdToDelete, authToken });
  };

  if (isError) {
    return <h1 className="mt-4">Error, intenta nuevamente</h1>;
  }

  //TODO new component for article edit card card
  return (
    <div className="flex flex-col mt-4 px-2">
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={'Eliminar Articulo'}
        description="Estas seguro de que deseas eliminar el articulo? Esta accion no puede ser revertida."
        primaryButtonText="Eliminar"
        pimaryButtonUse="destructive"
        primaryButtonAction={handleDelete}
      />
      <p className="text-4xl font-bold mb-4">Tus articulos</p>
      {articles?.length > 0 ? (
        <div className="divide-y">
          {articles?.map((article) => (
            <div key={article.id} className="flex py-4 justify-between grow">
              <div>
                <p className="text-lg font-bold">{article.title}</p>
                <p className="text-sm">
                  {`Modificado por ultima vez el ${Utils.formatDateTimeRelative(
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
                  <Button
                    use="primary"
                    size="sm"
                    disabled={article._count?.articleHistory >= 4}
                  >
                    Editar
                  </Button>
                </Link>
                <Button
                  use="destructive"
                  size="sm"
                  onClick={() => {
                    setArticleIdToDelete(article.id);
                    setIsOpen(true);
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : isLoading || status === 'idle' ? (
        <Spinner />
      ) : (
        <p className="text-center text-lg">No tienes articulos</p>
      )}
    </div>
  );
};

export default YourArticles;
