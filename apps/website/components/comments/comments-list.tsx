import { useState } from 'react';
import Comment from './comment';
import { useGetComments } from '../../hooks/useComments';
import { useArticleContext } from '../../contexts/article-context';
import CommentSortionMenu from '../comments/comment-sorting-menu';
import { CommentOrderBy } from '@newsfeed/data';

export enum SortOptions {
  Newest = 'Más nuevos',
  Oldest = 'Más antiguos',
  MostVoted = 'Mas votados',
  LeastVoted = 'Menos votados',
}

const CommentSortingQueryParams: { [key in SortOptions]: CommentOrderBy } = {
  [SortOptions.Newest]: 'createdAt=desc',
  [SortOptions.Oldest]: 'createdAt=asc',
  [SortOptions.MostVoted]: 'likes=desc',
  [SortOptions.LeastVoted]: 'likes=asc',
};

const CommentsList = () => {
  const articleVersionToDisplay = useArticleContext();
  const [selectedOption, setSelectedOption] = useState(SortOptions.Newest);

  const { data: comments, isLoading } = useGetComments(
    {
      id: articleVersionToDisplay.id,
      orderBy: CommentSortingQueryParams[selectedOption],
    },
    articleVersionToDisplay
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="divide-y">
      <CommentSortionMenu
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="flex flex-col space-y-4 pt-6">
        {comments?.length > 0 ? (
          comments
            .filter((comment) => {
              return comment.parentCommentId === null;
            })
            .map((comment) => (
              <Comment key={comment.id} comment={comment} comments={comments} />
            ))
        ) : (
          <div>No hay comentarios</div>
        )}
      </div>
    </div>
  );
};

export default CommentsList;
