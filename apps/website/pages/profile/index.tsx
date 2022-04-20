import ProfileCard from '../../components/profile/profile-card';
import { useUserProfileContext } from '../../contexts/user-context';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getWithPageRequiredDefaultOptions } from '../../utils/auth';

const Profile = () => {
  const { userProfile } = useUserProfileContext();
  return (
    <div className="flex flex-col space-y-2">
      <ProfileCard title="Nombre" value={userProfile?.userName} />
    </div>
  );
};

const ProtectedProfilePage = withPageAuthRequired(
  Profile,
  getWithPageRequiredDefaultOptions()
);

export default ProtectedProfilePage;
