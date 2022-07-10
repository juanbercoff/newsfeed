import { UserProfile } from '@prisma/client';
import Utils from '../../utils/Utils';
import UserAvatar from './user-avatar';
import { AvatarSize } from './user-avatar';

type ArticleAuthorInformationProps = {
  userProfile: UserProfile;
  avatarSize: AvatarSize;
};

const ArticleAuthorInformation = ({
  userProfile,
  avatarSize,
}: ArticleAuthorInformationProps) => {
  return (
    <div className="flex items space-x-2 items-center">
      <UserAvatar avatarSize={avatarSize} userName={userProfile.userName} />
      <p className="text-md">{userProfile.userName}</p>
      <p className="text-xs text-gray-500">
        {Utils.formatDateRelative(userProfile.createdAt)}
      </p>
    </div>
  );
};

export default ArticleAuthorInformation;
