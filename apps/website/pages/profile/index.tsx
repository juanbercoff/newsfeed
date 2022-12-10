import ProfileCard from '../../components/profile/profile-card';
import { useUserProfileContext } from '../../contexts/user-context';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getWithPageRequiredDefaultOptions } from '../../utils/auth';
import Skeleton from 'react-loading-skeleton';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';

const Profile = () => {
  const { userProfile, isLoading } = useUserProfileContext();
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col space-y-2 mt-4 px-4">
      {isLoading ? (
        <Skeleton width="768px" height="65px" containerClassName="skeleton" />
      ) : (
        <ProfileCard
          title={t('name')}
          value={userProfile?.userName}
          userProfileId={userProfile?.id}
          field="userName"
        />
      )}
    </div>
  );
};

const ProtectedProfilePage = withPageAuthRequired(
  Profile,
  getWithPageRequiredDefaultOptions()
);

export async function getStaticProps({ locale }) {
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

export default ProtectedProfilePage;
