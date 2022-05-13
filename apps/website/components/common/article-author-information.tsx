import { UserProfile } from '@prisma/client';
import Utils from '../../utils/Utils';
import UserAvatar from './user-avatar';

type ArticleAuthorInformationProps = {
  userProfile: UserProfile;
  profileImageSize: number;
};

const ArticleAuthorInformation = ({
  userProfile,
  profileImageSize,
}: ArticleAuthorInformationProps) => {
  return (
    <div className="flex items space-x-2 items-center">
      <UserAvatar userProfile={userProfile} />
      <p className="text-md">{userProfile.userName}</p>
      <p className="text-sm text-gray-500">
        {Utils.formatDateRelative(userProfile.createdAt)}
      </p>
    </div>
  );
};

export default ArticleAuthorInformation;
