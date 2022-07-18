import { UserProfile } from '@prisma/client';
import Utils from '../../utils/Utils';
import UserAvatar from './user-avatar';
import { AvatarSize } from './user-avatar';

type ArticleAuthorInformationProps = {
  userProfile: UserProfile;
  avatarSize: AvatarSize;
  articleCreatedDate: Date;
};

const ArticleAuthorInformation = ({
  userProfile,
  avatarSize,
  articleCreatedDate,
}: ArticleAuthorInformationProps) => {
  return (
    <div className="flex items space-x-2 items-baseline">
      {/* <UserAvatar avatarSize={avatarSize} userName={userProfile?.userName} /> */}
      <p className="text-sm font-semibold">{userProfile?.userName}</p>
      <p className="text-xs text-gray-500">
        {Utils.formatDateRelative(articleCreatedDate)}
      </p>
    </div>
  );
};

export default ArticleAuthorInformation;
