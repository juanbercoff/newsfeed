import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import { FaRegCommentAlt } from 'react-icons/fa';
import CommentForm from '../comments/comment-form';
import { useState } from 'react';
import { useArticleContext } from '../../contexts/article-context';
import { useTranslation } from 'next-i18next';

interface ActionsProps {
  countOfComments?: number;
  isArticle: boolean;
  handleLike: (like: boolean) => void;
  commentId?: string;
  isLiked: number;
  likeCount: number;
}

const Actions = ({
  countOfComments,
  isArticle,
  handleLike,
  commentId,
  isLiked,
  likeCount,
}: ActionsProps) => {
  const [showForm, setShowForm] = useState(false);
  const articleVersionToDisplay = useArticleContext();
  const { t } = useTranslation('article');

  const handleClick = () => {
    isArticle ? setShowForm(false) : setShowForm(!showForm);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-start space-x-1 ">
        <GoArrowUp
          style={{ color: isLiked === 1 ? 'green' : 'black' }}
          size={24}
          onClick={(e) => {
            handleLike(true);
            e.stopPropagation();
          }}
          className="cursor-pointer hover:bg-slate-300 rounded"
        />
        <p className="font-medium">{likeCount || 0}</p>
        <GoArrowDown
          style={{ color: isLiked === -1 ? 'red' : 'black' }}
          size={24}
          onClick={(e) => {
            handleLike(false);
            e.stopPropagation();
          }}
          className="cursor-pointer hover:bg-slate-300 rounded"
        />
        {!!articleVersionToDisplay &&
        'comments' in articleVersionToDisplay ? null : (
          <div
            className="ml-4 flex justify-center space-x-1 items-center hover:bg-slate-300 rounded px-1 cursor-pointer"
            onClick={() => handleClick()}
          >
            <FaRegCommentAlt size={17} />
            <p className="font-medium text-sm">
              {isArticle ? countOfComments : t('reply')}
            </p>
          </div>
        )}
      </div>
      {showForm && (
        <CommentForm commentId={commentId} setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default Actions;
