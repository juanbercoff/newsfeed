import { useUserProfileContext } from '../../contexts/user-context';

export type AvatarSize = 'sm' | 'md' | 'lg';

type UserAvatarProps = {
  avatarSize: AvatarSize;
};

const AVATAR_SIZE: { [key in AvatarSize]: string } = {
  sm: 'h-[24px] w-[24px]',
  md: 'h-[28px] w-[28px]',
  lg: 'h-[32px] w-[32px]',
};

const UserAvatar = ({ avatarSize }: UserAvatarProps) => {
  const { userProfile } = useUserProfileContext();

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
    <div
      className={`${AVATAR_SIZE[avatarSize]} rounded-full bg-sky-900 flex justify-center items-center`}
    >
      <p className="font-semibold text-sm text-white">
        {!userProfile ? 'U' : getInitials(userProfile.userName)}
      </p>
    </div>
  );
};

export default UserAvatar;
