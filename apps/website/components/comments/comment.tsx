import Actions from '../common/actions';
import { CommentWithAuthorAndLikes } from '@newsfeed/data';
import { CommentLike } from '@prisma/client';
import useLikes from '../../hooks/useLikes';
import {
  getUserCommentLike,
  deleteCommentLike,
  postCommentLike,
} from '../../services/comment-likes-api';

interface CommentProps {
  comment: CommentWithAuthorAndLikes;
  commentChildren?: CommentWithAuthorAndLikes[];
}

const Comment = ({ comment, commentChildren }: CommentProps) => {
  const { uiLikes, hasBeenLiked, handleLike } = useLikes<CommentLike>(
    comment.id,
    comment.commentLike?._sum.like,
    getUserCommentLike,
    deleteCommentLike,
    postCommentLike
  );

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row justify-start space-x-2 items-end">
          <div className="rounded-full border-2 p-3"></div>
          <p className="font-medium text-sm">
            {comment.author.profile.userName}
          </p>
          <p className="text-gray-400 text-sm">{comment.createdAt}</p>
        </div>
        <div className="space-y-2">
          <div className="ml-3">{comment.content}</div>
          <div className="ml-2">
            <Actions
              isArticle={false}
              uiLikes={uiLikes}
              like={hasBeenLiked?.like}
              handleLike={handleLike}
            />
          </div>
        </div>
      </div>
      <div className="ml-8 mt-4 space-y-4 items-start flex-col">
        {commentChildren?.length > 0
          ? commentChildren.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Comment;
