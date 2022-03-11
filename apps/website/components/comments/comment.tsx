import CommentsList from './comments-list';

interface Comment {
  username: string;
  body: string;
  time: string;
  parentId: number | null;
  id: number;
}

interface CommentProps {
  username: string;
  body: string;
  time: string;
  parentId: number | null;
  commentChildren: Comment[] | [];
}

const Comment = ({ username, body, time, commentChildren }: CommentProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-start space-x-2 items-end mb-1">
          <div className="rounded-full border-2 p-3"></div>
          <p className="font-medium text-sm">{username}</p>
          <p className="text-gray-400 text-sm">{time}</p>
        </div>
        <div className="ml-3">{body}</div>
      </div>
      <div className="ml-6 mt-4 space-y-4">
        {commentChildren?.length > 0
          ? commentChildren.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Comment;
