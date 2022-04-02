import Comment from './comment';
import { useGetComments } from '../../hooks/useComments';
import { useGetCommentLikes } from '../../hooks/useCommentsLikes';
import { useArticleContext } from '../../contexts/article-context';

const CommentsList = () => {
  const { id } = useArticleContext();
  const {
    data: comments,
    isLoading,
    error,
  } = useGetComments({ articleId: id });
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
              commentWithLikes={commentWithLikes}
            />
          ))
      ) : (
        <div>No hay comentarios</div>
      )}
    </div>
  );
};

export default CommentsList;
