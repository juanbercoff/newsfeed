import Comment from './comment';
import { useGetComments } from '../../hooks/useComments';

const CommentsList = () => {
  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.parentCommentId === commentId);
  };

  const { data: comments, isLoading, error } = useGetComments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {comments
        .filter((comment) => {
          return comment.parentCommentId === null;
        })
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            commentChildren={getReplies(comment.id)}
          />
        ))}
    </div>
  );
};

export default CommentsList;
