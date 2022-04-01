import { useForm } from 'react-hook-form';
import { postComment } from '../../services/comments-api';
import { useUserProfileContext } from '../../contexts/user-context';
import { CreateCommentDto } from '@newsfeed/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CommentFormData = {
  comment: string;
};

type CommentFormProps = {
  articleId: string;
  parentCommentId?: string;
};

const CommentForm = ({ articleId, parentCommentId }: CommentFormProps) => {
  const { authToken } = useUserProfileContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CommentFormData>();
  const onSubmit = (formData: CommentFormData) => {
    const data: CreateCommentDto = {
      articleId,
      parentCommentId,
      content: formData.comment,
    };
    postComment(data, authToken);
    //TODO: Error handling
    toast('Comentario posteado');
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border">
          <textarea
            {...register('comment', { required: true, maxLength: 2000 })}
            className="w-full h-[108px] bg-transparent pt-2 px-4 block rounded min-h-[108px]"
          ></textarea>

          <div className="flex justify-end p-4 bg-slate-400">
            <button
              type="submit"
              disabled={!!errors.comment || !watch('comment')}
              className={`text-white font-semibold py-1 px-3 rounded ${
                !watch('comment') || errors.comment
                  ? 'bg-slate-200 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-700  active:bg-blue-800'
              } `}
            >
              Comentar
            </button>
          </div>
        </div>
        {errors.comment?.type === 'required' && 'Escribi algo para comentar'}
        {errors.comment?.type === 'maxLength' &&
          'Superaste el limite de 2000 caracteres'}
      </form>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default CommentForm;
