import React from 'react';
import ArticleForm from '../../../screens/article-form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getWithPageRequiredDefaultOptions } from '../../../utils/auth';
import { useCreateArticle } from '../../../hooks/useArticles';

const NewArticle = () => {
  return (
    <div className="p-5">
      <ArticleForm queryHook={useCreateArticle} />
    </div>
  );
};

const ProtectedNewArticle = withPageAuthRequired(
  NewArticle,
  getWithPageRequiredDefaultOptions()
);

export default ProtectedNewArticle;
