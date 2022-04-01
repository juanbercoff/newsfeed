import Comment from './comment';
import { useGetComments } from '../../hooks/useComments';
import { useGetCommentLikes } from '../../hooks/useCommentsLikes';

interface CommentsListProps {
  articleId: string;
}

const CommentsList = ({ articleId }: CommentsListProps) => {
  const { data: comments, isLoading, error } = useGetComments({ articleId });
  const {
    data: commentLikes,
    isLoading: isLoadingLikes,
    error: errorLikes,
  } = useGetCommentLikes();

  if (isLoading || isLoadingLikes) {
    return <div>Loading...</div>;
  }

  const commentWithLikes = comments.map((comment) => {
    const commentLike = commentLikes.find(
      (commentLike) => commentLike.commentId === comment.id
    );
    return { ...comment, commentLike };
  });

  const getReplies = (commentId) => {
    return commentWithLikes.filter(
      (comment) => comment.parentCommentId === commentId
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      {commentWithLikes.length > 0 ? (
        commentWithLikes
          .filter((comment) => {
            return comment.parentCommentId === null;
          })
          .map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              commentChildren={getReplies(comment.id)}
            />
          ))
      ) : (
        <div>No hay comentarios</div>
      )}
    </div>
  );
};

export default CommentsList;
