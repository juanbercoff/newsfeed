import React from 'react';
import EditArticleForm from '../../../screens/edit-article-form';
import { useRouter } from 'next/router';
import { useGetOneArticle } from '../../../hooks/useArticles';
import Spinner from '../../../components/common/spinner';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getWithPageRequiredDefaultOptions } from '../../../utils/auth';

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

export default ProtectedEditArticle;
