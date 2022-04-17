import React from 'react';
import ArticleForm from '../../../screens/article-form';
import { useRouter } from 'next/router';
import { useGetOneArticle } from '../../../hooks/useArticles';

const ArticleEditor = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: article,
    isError,
    isLoading,
  } = useGetOneArticle({ id: id as string });

  return (
    <div className="p-5">
      <ArticleForm />
    </div>
  );
};

export default ArticleEditor;
