import { useState } from 'react';
import { useGetUserArticles, useDeleteArticle } from '../../hooks/useArticles';
import Spinner from '../../components/common/spinner';
import Utils from '../../utils/Utils';
import Button from '../../components/common/button';
import Link from 'next/link';
import Modal from '../../components/common/modal';
import { useUserProfileContext } from '../../contexts/user-context';
import Skeleton from 'react-loading-skeleton';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation(['article', 'common']);

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
        title={t('deleteArticle')}
        description={t('deleteArticleDescription')}
        primaryButtonText={t('delete', {
          ns: 'common',
        })}
        pimaryButtonUse="destructive"
        primaryButtonAction={handleDelete}
      />
      <p className="text-4xl font-bold mb-4">{t('yourArticles')}</p>
      {articles?.length > 0 ? (
        <div className="divide-y">
          {articles?.map((article) => (
            <div key={article.id} className="flex py-4 justify-between grow">
              <div>
                <p className="text-lg font-bold">{article.title}</p>
                <p className="text-sm">
                  {`${t('lastModifiedDate', {
                    ns: 'common',
                  })} ${Utils.formatDateTimeRelative(article.updatedAt)}`}
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
                    {t('edit', {
                      ns: 'common',
                    })}
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
                  {t('delete', {
                    ns: 'common',
                  })}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : isLoading || status === 'idle' ? (
        <Skeleton height={80} />
      ) : (
        <p className="text-center text-lg">
          {t('noArticlesWritten', {
            ns: 'common',
          })}
        </p>
      )}
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'top-bar', 'article'],
        nextI18NextConfig
      )),
    },
  };
}

export default YourArticles;
