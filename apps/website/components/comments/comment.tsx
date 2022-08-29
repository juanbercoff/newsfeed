import Actions from '../common/actions';
import {
  CommentsResponseDto,
  CreateCommentLikePayload,
  UpdateCommentLikePayload,
  DeleteCommentLikePayload,
} from '@newsfeed/data';
import { DateTime } from 'luxon';
import UserAvatar from '../common/user-avatar';
import {
  useGetCommentIsLiked,
  useDeleteCommentLike,
  useUpdateCommentLike,
  useCreateCommentLike,
} from '../../hooks/useCommentsLikes';
import { useRouter } from 'next/router';
import Utils from '../../utils/Utils';
import { CommentLike } from '@prisma/client';

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
  const { push, pathname } = useRouter();
  const { mutate: createCommentLike } = useCreateCommentLike();
  const { mutate: updateCommentLike } = useUpdateCommentLike();
  const { mutate: deleteCommentLike } = useDeleteCommentLike();

  const handleLikeFunction = (like: boolean) =>
    Utils.handleLike<
      CreateCommentLikePayload,
      UpdateCommentLikePayload,
      DeleteCommentLikePayload,
      CommentLike
    >(
      like,
      commentUserLiked,
      authToken,
      `/api/auth/login?returnTo=/${pathname}`,
      createCommentLike,
      updateCommentLike,
      deleteCommentLike,
      push,
      { like: like, commentId: comment.id, authToken },
      { like: like, commentLikeId: commentUserLiked?.id, authToken },
      { commentLikeId: commentUserLiked.id, authToken }
    );

  const getReplies = (commentId: string) => {
    return comments.filter((comment) => comment.parentCommentId === commentId);
  };

  const isoStringToRelativeTime = (isoString) =>
    DateTime.fromISO(isoString).toRelative({ locale: 'es' });
  //TODO: no permitir responder
  return (
    <div className="space-y-2">
      <div className="flex flex-row justify-start space-x-2 items-center">
        <UserAvatar avatarSize="sm" userName={comment?.userName} />
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
              handleLike={handleLikeFunction}
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
