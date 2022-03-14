import Actions from '../common/actions';
import CommentsList from './comments-list';
import { CommentWithClosureDto } from '@newsfeed/data';

interface CommentProps {
  comment: CommentWithClosureDto;
  commentChildren?: CommentWithClosureDto[];
}

const Comment = ({ comment, commentChildren }: CommentProps) => {
  return (
    <div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row justify-start space-x-2 items-end">
          <div className="rounded-full border-2 p-3"></div>
          <p className="font-medium text-sm">{comment.authorId}</p>
          <p className="text-gray-400 text-sm">{comment.createdAt}</p>
        </div>
        <div className="space-y-2">
          <div className="ml-3">{comment.content}</div>
          <div className="ml-2">
            <Actions />
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
