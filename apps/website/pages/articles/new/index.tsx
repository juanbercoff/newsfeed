import React from 'react';
import NewArticleForm from '../../../screens/new-article-form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getWithPageRequiredDefaultOptions } from '../../../utils/auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';

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

export async function getServerSideProps({ locale }) {
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

export default ProtectedNewArticle;
