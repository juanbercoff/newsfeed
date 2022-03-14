import Image from 'next/image';
import Link from 'next/link';
import { ArticleWithAuthorResponseDto } from '@newsfeed/data';
import Actions from '../common/actions';

const Card = ({ id, title, author }: ArticleWithAuthorResponseDto) => {
  return (
    <Link href={`/feed/${id}`} passHref={true}>
      <div className="border flex justify-center flex-col items-start max-h-lg bg-white hover:bg-teal-100 hover:cursor-pointer">
        <div className="relative w-full h-[350px]">
          <Image
            src="/image.webp"
            layout="fill"
            objectFit="contain"
            alt="news picture"
          />
        </div>
        <div className="p-4 space-y-2">
          <p className="text-3xl font-medium">{title}</p>
          <p className="text-sm text-gray-500 mt-2">15/04/2022</p>

          <p className="text-lg">{author.username}</p>
          <Actions />
        </div>
      </div>
    </Link>
  );
};

export default Card;
