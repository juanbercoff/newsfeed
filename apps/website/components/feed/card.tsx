import Image from 'next/image';
import Link from 'next/link';
import { ArticleResponseDto, AllArticlesLikesDto } from '@newsfeed/data';
import Actions from '../common/actions';

interface CardProps {
  article: ArticleResponseDto & { articleLike: AllArticlesLikesDto };
}

const Card = ({ article }: CardProps) => {
  return (
    <Link href={`/feed/${article.id}`} passHref={true}>
      <div className="border flex justify-center flex-col items-start max-h-lg bg-white hover:bg-teal-100 hover:cursor-pointer">
        <div className="relative w-full h-[350px]">
          <Image
            src="/image.webp"
            layout="fill"
            objectFit="cover"
            alt="news picture"
          />
        </div>
        <div className="p-4 space-y-2">
          <p className="text-3xl font-medium">{article.title}</p>
          <p className="text-sm text-gray-500 mt-2">15/04/2022</p>

          <p className="text-lg">{article.author.profile.userName}</p>
          <Actions
            countOfComments={article._count.comments}
            isArticle={true}
            countOfLikes={article.articleLike?._sum.like}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
