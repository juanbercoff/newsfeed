import { UserProfile } from '@prisma/client';

type UserAvatarProps = {
  userProfile: UserProfile;
};

const UserAvatar = ({ userProfile }: UserAvatarProps) => {
  const getInitials = (userName: string) => {
    const words = userName.split(' ');
    if (words.length > 1) {
      return words
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase();
    } else {
      return `${userName.charAt(0)}${userName.charAt(1)}`.toUpperCase();
    }
  };

  return (
    <div className="rounded-full bg-sky-900 h-7 w-7 flex justify-center items-center">
      <p className="font-semibold text-sm text-white">
        {getInitials(userProfile.userName)}
      </p>
    </div>
  );
};

export default UserAvatar;
