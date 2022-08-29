import { useState } from 'react';
import Comment from './comment';
import { useGetComments } from '../../hooks/useComments';
import { useArticleContext } from '../../contexts/article-context';
import CommentSortionMenu from '../comments/comment-sorting-menu';
import { CommentOrderBy } from '@newsfeed/data';
import { useUserProfileContext } from '../../contexts/user-context';
import { useTranslation } from 'next-i18next';

export enum SortOptions {
  Newest = 'latest',
  Oldest = 'oldest',
  MostVoted = 'top',
  LeastVoted = 'leastVoted',
}

const CommentSortingQueryParams: { [key in SortOptions]: CommentOrderBy } = {
  //TODO sort_key=createdAt&sort_direction=desc
  [SortOptions.Newest]: 'createdAt=desc',
  [SortOptions.Oldest]: 'createdAt=asc',
  [SortOptions.MostVoted]: 'likes=desc',
  [SortOptions.LeastVoted]: 'likes=asc',
};

const CommentsList = () => {
  const articleVersionToDisplay = useArticleContext();
  const { authToken } = useUserProfileContext();
  const [selectedOption, setSelectedOption] = useState(SortOptions.Newest);
  const { t } = useTranslation('article');

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
              <Comment
                key={comment.id}
                comment={comment}
                comments={comments}
                authToken={authToken}
              />
            ))
        ) : (
          <div>{t('noComments')}</div>
        )}
      </div>
    </div>
  );
};

export default CommentsList;
