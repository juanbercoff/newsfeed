import React from 'react';
import NewArticleForm from '../../../screens/new-article-form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getWithPageRequiredDefaultOptions } from '../../../utils/auth';

const NewArticle = () => {
  return (
    <div className="p-5">
      <NewArticleForm />
    </div>
  );
};

const ProtectedNewArticle = withPageAuthRequired(
  NewArticle,
  getWithPageRequiredDefaultOptions()
);

export default ProtectedNewArticle;
