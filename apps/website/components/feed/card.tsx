import Image from 'next/image';
import { useRouter } from 'next/router';
import { TiArrowUpOutline, TiArrowDownOutline } from 'react-icons/ti';
import { FaRegCommentAlt } from 'react-icons/fa';
import { ArticleWithAuthorResponseDto } from '@newsfeed/data';

const Card = ({ id, title, author }: ArticleWithAuthorResponseDto) => {
  const router = useRouter();
  return (
    <div
      className="border flex justify-center flex-col items-start max-h-lg bg-white space-y-4 pb-4 hover:bg-teal-100 hover:cursor-pointer"
      onClick={() => {
        router.push('/feed/[id]', `/feed/${id}`);
      }}
    >
      <div className="relative w-full h-[350px]">
        <Image
          src="/image.webp"
          layout="fill"
          objectFit="contain"
          alt="news picture"
        />
      </div>
      <div>
        <p className="text-3xl font-medium px-4">{title}</p>
        <p className="text-sm px-4 text-gray-500 mt-2">15/04/2022</p>
      </div>

      <p className="text-lg px-4 ">{author.username}</p>
      <div className="px-3 flex justify-center space-x-1">
        <div className="hover:fill-blue-500">
          <TiArrowUpOutline size={24} />
        </div>

        <p className="font-medium">120</p>
        <TiArrowDownOutline size={24} />
        <div className="pl-4 flex justify-center space-x-1">
          <FaRegCommentAlt size={18} />
          <p className="font-medium">30</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
