import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import { FaRegCommentAlt } from 'react-icons/fa';
import CommentForm from '../comments/comment-form';
import { useState } from 'react';

interface ActionsProps {
  countOfComments?: number;
  isArticle: boolean;
  uiLikes: number;
  like: number | null;
  handleLike: (like: boolean) => void;
  commentId?: string;
}

const Actions = ({
  countOfComments,
  isArticle,
  uiLikes,
  like,
  handleLike,
  commentId,
}: ActionsProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    isArticle ? setShowForm(false) : setShowForm(!showForm);
  };

  return (
    <div className="space-y-2">
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
        <div
          className="ml-4 flex justify-center space-x-1 items-center hover:bg-slate-300 rounded px-1 cursor-pointer"
          onClick={() => handleClick()}
        >
          <FaRegCommentAlt size={17} />
          <p className="font-medium text-sm">
            {isArticle ? countOfComments : 'Responder'}
          </p>
        </div>
      </div>
      {showForm && (
        <CommentForm commentId={commentId} setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default Actions;
