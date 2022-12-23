import React from 'react';
import EditArticleForm from '../../../screens/edit-article-form';
import { useRouter } from 'next/router';
import { useGetOneArticle } from '../../../hooks/useArticles';
import Spinner from '../../../components/common/spinner';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getWithPageRequiredDefaultOptions } from '../../../utils/auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';
import { getArticlesList } from '../../../services/articles-api';

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: article,
    isError,
    isLoading,
  } = useGetOneArticle({ id: id as string });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="p-5">
      <EditArticleForm article={article} />
    </div>
  );
};

const ProtectedEditArticle = withPageAuthRequired(
  EditArticle,
  getWithPageRequiredDefaultOptions()
);

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'top-bar'],
        nextI18NextConfig
      )),
    },
  };
}

export default ProtectedEditArticle;
