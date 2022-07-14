import ProfileCard from '../../components/profile/profile-card';
import { useUserProfileContext } from '../../contexts/user-context';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getWithPageRequiredDefaultOptions } from '../../utils/auth';
import Skeleton from 'react-loading-skeleton';

const Profile = () => {
  const { userProfile, isLoading } = useUserProfileContext();
  return (
    <div className="flex flex-col space-y-2 mt-4 px-4">
      {isLoading ? (
        <Skeleton width="768px" height="65px" containerClassName="skeleton" />
      ) : (
        <ProfileCard
          title="Nombre"
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

export default ProtectedProfilePage;
