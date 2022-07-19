import Utils from '../../utils/Utils';
import UserAvatar from './user-avatar';
import { AvatarSize } from './user-avatar';

type ArticleAuthorInformationProps = {
  userName: string;
  avatarSize: AvatarSize;
  articleCreatedDate: Date;
};

const ArticleAuthorInformation = ({
  userName,
  avatarSize,
  articleCreatedDate,
}: ArticleAuthorInformationProps) => {
  return (
    <div className="flex items space-x-2 items-baseline">
      <UserAvatar avatarSize={avatarSize} userName={userName} />
      <p className="text-sm font-semibold">{userName}</p>
      <p className="text-xs text-gray-500">
        {Utils.formatDateRelative(articleCreatedDate)}
      </p>
    </div>
  );
};

export default ArticleAuthorInformation;
