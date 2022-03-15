import Comment from './comment';
import { useGetComments } from '../../hooks/useComments';

interface CommentsListProps {
  articleId: string;
}

const CommentsList = ({ articleId }: CommentsListProps) => {
  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.parentCommentId === commentId);
  };

  const { data: comments, isLoading, error } = useGetComments({ articleId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {comments.length > 0 ? (
        comments
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
