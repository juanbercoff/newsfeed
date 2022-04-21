import Comment from './comment';
import { useGetComments } from '../../hooks/useComments';
import { useGetCommentLikes } from '../../hooks/useCommentsLikes';
import { useArticleContext } from '../../contexts/article-context';
import { CommentWithAuthorAndLikes } from '@newsfeed/data';

//FIX ME
type CommentProps = {
  oldComments?: any;
};

const CommentsList = ({ oldComments }: CommentProps) => {
  const { id } = useArticleContext();

  const { data: comments, isLoading } = useGetComments({ articleId: id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (oldComments) {
    return (
      <div className="flex flex-col space-y-4">
        {oldComments.length > 0 ? (
          oldComments
            .filter((comment) => {
              return comment.parentCommentId === null;
            })
            .map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                commentWithLikes={comments}
              />
            ))
        ) : (
          <div>No hay comentarios</div>
        )}
      </div>
    );
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
              commentWithLikes={comments}
            />
          ))
      ) : (
        <div>No hay comentarios</div>
      )}
    </div>
  );
};

export default CommentsList;
