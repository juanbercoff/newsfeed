import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import { FaRegCommentAlt } from 'react-icons/fa';

interface ActionsProps {
  countOfComments?: number;
  isArticle: boolean;
  uiLikes: number;
  like: number | null;
  handleLike: (like: boolean) => void;
}

const Actions = ({
  countOfComments,
  isArticle,
  uiLikes,
  like,
  handleLike,
}: ActionsProps) => {
  return (
    <div className="flex justify-start space-x-1 ">
      <GoArrowUp
        style={{ color: like === 1 ? 'green' : 'black' }}
        size={24}
        onClick={(e) => {
          handleLike(true);
          e.stopPropagation();
        }}
        className="cursor-pointer hover:bg-slate-300 rounded"
      />
      <p className="font-medium">{uiLikes}</p>
      <GoArrowDown
        style={{ color: like === -1 ? 'red' : 'black' }}
        size={24}
        onClick={(e) => {
          handleLike(false);
          e.stopPropagation();
        }}
        className="cursor-pointer hover:bg-slate-300 rounded"
      />
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
