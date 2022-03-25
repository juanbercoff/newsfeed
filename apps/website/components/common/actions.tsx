import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import { FaRegCommentAlt } from 'react-icons/fa';

interface ActionsProps {
  countOfComments?: number;
  isArticle: boolean;
  countOfLikes?: number;
}

const Actions = ({
  countOfComments,
  isArticle,
  countOfLikes,
}: ActionsProps) => {
  return (
    <div className="flex justify-start space-x-1 ">
      <GoArrowUp size={24} />
      <p className="font-medium">{countOfLikes ?? 0}</p>
      <GoArrowDown size={24} />
      {isArticle ? (
        <div className="pl-4 flex justify-center space-x-1 items-center">
          <FaRegCommentAlt size={17} />
          <p className="font-medium">{countOfComments}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Actions;
