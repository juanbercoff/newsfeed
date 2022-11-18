import { useForm } from 'react-hook-form';
import { CreateCommentDto } from '@newsfeed/data';
import 'react-toastify/dist/ReactToastify.css';
import { useArticleContext } from '../../contexts/article-context';
import { useCreateComment } from '../../hooks/useComments';
import { useUserProfileContext } from '../../contexts/user-context';
import Button from '../common/button';
import { useTranslation } from 'next-i18next';

type CommentFormData = {
  comment: string;
};

type CommentFormProps = {
  commentId?: string;
  setShowForm?: (showForm: boolean) => void;
};

const CommentForm = ({ commentId, setShowForm }: CommentFormProps) => {
  const article = useArticleContext();
  const { authToken } = useUserProfileContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CommentFormData>();

  const onMutateSucess = () => {
    reset();
    setShowForm ? setShowForm(false) : null;
  };
  const { mutate } = useCreateComment(onMutateSucess);
  const { t } = useTranslation('article');

  const onSubmit = (formData: CommentFormData) => {
    const data: CreateCommentDto = {
      articleId: article.id,
      parentCommentId: commentId,
      content: formData.comment,
    };
    mutate({ data, authToken });
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
              <Button
                use="secondary"
                onClick={() => setShowForm(false)}
                className="font-semibold "
              >
                {t('cancel')}
              </Button>
            )}
            <Button
              disabled={!!errors.comment || !watch('comment')}
              use="primary"
              onClick={() => {
                //return setShowForm ? setShowForm(false) : null;
              }}
              type="submit"
            >
              {t('comment')}
            </Button>
          </div>
        </div>
        {errors.comment?.type === 'required' && t('commentErrorRequired')}
        {errors.comment?.type === 'maxLength' && t('commentErrorMax')}
      </form>
    </>
  );
};

export default CommentForm;
