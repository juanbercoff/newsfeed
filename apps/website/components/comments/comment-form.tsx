import { useForm } from 'react-hook-form';
import { CreateCommentDto } from '@newsfeed/data';
import 'react-toastify/dist/ReactToastify.css';
import { useArticleContext } from '../../contexts/article-context';
import { useCreateComment } from '../../hooks/useComments';

type CommentFormData = {
  comment: string;
};

type CommentFormProps = {
  commentId?: string;
  setShowForm?: (showForm: boolean) => void;
};

const CommentForm = ({ commentId, setShowForm }: CommentFormProps) => {
  const article = useArticleContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CommentFormData>();

  const { mutate } = useCreateComment(reset);

  const onSubmit = (formData: CommentFormData) => {
    const data: CreateCommentDto = {
      articleId: article.id,
      parentCommentId: commentId,
      content: formData.comment,
    };
    mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border">
          <textarea
            {...register('comment', { required: true, maxLength: 2000 })}
            className="w-full h-[108px] bg-transparent pt-2 px-4 block rounded min-h-[108px] outline-none"
          ></textarea>

          <div className="flex justify-end p-4 bg-slate-400 gap-2">
            {commentId && (
              <button
                className="text-white font-semibold py-1 px-3 rounded bg-blue-500 hover:bg-blue-700  active:bg-blue-800"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            )}
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
    </>
  );
};

export default CommentForm;
