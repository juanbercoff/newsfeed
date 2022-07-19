import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export type AvatarSize = 'sm' | 'md' | 'lg';

type UserAvatarProps = {
  avatarSize: AvatarSize;
  userName: string;
};

const AVATAR_SIZE: { [key in AvatarSize]: string } = {
  sm: 'h-[24px] w-[24px]',
  md: 'h-[28px] w-[28px]',
  lg: 'h-[32px] w-[32px]',
};

const UserAvatar = ({ avatarSize, userName }: UserAvatarProps) => {
  const getInitials = (userName: string) => {
    console.log(userName);
    if (!userName) {
      return <Skeleton />;
    }
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
      className={`${AVATAR_SIZE[avatarSize]} rounded-full bg-[#7B1FA2] flex justify-center items-center`}
    >
      <p className="font-semibold text-xs text-white">
        {getInitials(userName)}
      </p>
    </div>
  );
};

export default UserAvatar;
