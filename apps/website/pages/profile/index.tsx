import ProfileCard from '../../components/profile/profile-card';
import { useUserProfileContext } from '../../contexts/user-context';

const Profile = () => {
  const { userProfile } = useUserProfileContext();
  return (
    <div className="flex flex-col space-y-2">
      <ProfileCard title="Nombre" value={userProfile?.userName} />
    </div>
  );
};

export default Profile;
