import { UserProfile } from '@prisma/client';
import Utils from '../../utils/Utils';
import Image from 'next/image';

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
      <Image
        className="rounded-full"
        alt="profile picture"
        height={profileImageSize}
        width={profileImageSize}
        src={
          'https://lh3.googleusercontent.com/a/AATXAJwS_dRkTCQqvW8PbWTJa4mbuIFgeJrVW2v9jGWC=s96-c'
        }
      />
      <p className="text-md">{userProfile.userName}</p>
      <p className="text-sm text-gray-500">
        {Utils.formatDateRelative(userProfile.createdAt)}
      </p>
    </div>
  );
};

export default ArticleAuthorInformation;
