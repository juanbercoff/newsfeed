import Actions from '../common/actions';
import { CommentsResponseDto } from '@newsfeed/data';
import { DateTime } from 'luxon';
import UserAvatar from '../common/user-avatar';
import { useGetCommentIsLiked } from '../../hooks/useCommentsLikes';

interface CommentProps {
  comment: CommentsResponseDto;
  comments: CommentsResponseDto[];
  authToken: string;
}

const Comment = ({ comment, comments, authToken }: CommentProps) => {
  const { data: commentUserLiked } = useGetCommentIsLiked(
    comment.id,
    authToken
  );

  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.parentCommentId === commentId);
  };

  const isoStringToRelativeTime = (isoString) =>
    DateTime.fromISO(isoString).toRelative({ locale: 'es' });

  return (
    <div className="space-y-2">
      <div className="flex flex-row justify-start space-x-2 items-center">
        <UserAvatar avatarSize="sm" userName="user name" />
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
              handleLike={() => ({})}
              commentId={comment.id}
              likeCount={comment.likes}
              isLiked={commentUserLiked?.like}
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
                  authToken={authToken}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
