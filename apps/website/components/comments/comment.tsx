import Actions from '../common/actions';
import { CommentsResponseDto } from '@newsfeed/data';
import { CommentLike } from '@prisma/client';
import useLikes from '../../hooks/useLikes';
import {
  getUserCommentLike,
  deleteCommentLike,
  postCommentLike,
} from '../../services/comment-likes-api';
import { DateTime } from 'luxon';
import Image from 'next/image';
import UserAvatar from '../common/user-avatar';

interface CommentProps {
  comment: CommentsResponseDto;
  comments: CommentsResponseDto[];
}

const Comment = ({ comment, comments }: CommentProps) => {
  const { uiLikes, hasBeenLiked, handleLike } = useLikes<CommentLike>(
    comment.id,
    comment.likes,
    getUserCommentLike,
    deleteCommentLike,
    postCommentLike
  );

  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.parentCommentId === commentId);
  };

  const isoStringToRelativeTime = (isoString) =>
    DateTime.fromISO(isoString).toRelative({ locale: 'es' });

  return (
    <div className="space-y-2">
      <div className="flex flex-row justify-start space-x-2 items-center">
        <UserAvatar avatarSize="sm" />
        <p className="font-medium text-sm">{comment?.userName}</p>
        <p className="text-gray-400 text-sm">
          {isoStringToRelativeTime(comment.createdAt)}
        </p>
      </div>
      <div className="border-l-2 border-slate-200 ml-3">
        <div className="space-y-2 p-1">
          <div className="ml-3">{comment.content}</div>
          <div className="ml-2">
            <Actions
              isArticle={false}
              uiLikes={uiLikes}
              like={hasBeenLiked?.like}
              handleLike={handleLike}
              commentId={comment.id}
            />
          </div>
        </div>
        <div className="ml-4 mt-4 space-y-4 items-start flex-col">
          {getReplies(comment.id)?.length > 0
            ? getReplies(comment.id).map((newComment) => (
                <Comment
                  key={newComment.id}
                  comment={newComment}
                  comments={comments}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
