import { useForm, Controller } from 'react-hook-form';
import {
  UpdateArticleDto,
  ArticleResponseDto,
  ArticleFormData,
} from '@newsfeed/data';
import 'react-toastify/dist/ReactToastify.css';
import styles from './article-form-style.module.css';
import ArticleFormContentEditor from './article-form-content-editor';
import Button from '../components/common/button';
import { useRouter } from 'next/router';
import { useUpdateArticle } from '../hooks/useArticles';
import Utils from '../utils/Utils';
import { useUserProfileContext } from '../contexts/user-context';

type ArticleFormProps = {
  article: ArticleResponseDto;
};

const EditArticleForm = ({ article }: ArticleFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<ArticleFormData>();
  const { push } = useRouter();
  const { authToken } = useUserProfileContext();
  const { mutate } = useUpdateArticle(push);

  const onSubmit = (formData: ArticleFormData) => {
    const data: UpdateArticleDto = {
      title: formData.title,
      content: Utils.parseHtml(formData.content),
    };

    if (
      article.articleContent === data.content &&
      article.title === data.title
    ) {
      setError('title', {
        type: 'custom',
        message: 'Modifica el titulo o contenido para editar el articulo',
      });
    } else {
      mutate({ data, articleId: article.id, authToken });
    }
  };

  return (
    <div className="pt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <input
            {...register('title', {
              required: true,
              maxLength: 80,
              value: article.title,
            })}
            className={[
              'bg-transparent p-2 rounded min-h-[108px] text-3xl w-full',
              styles.input,
            ].join(' ')}
            placeholder="Titulo del articulo"
          ></input>
          <Controller
            control={control}
            defaultValue={article.articleContent}
            render={({ field }) => (
              <ArticleFormContentEditor
                contentValue={article.articleContent}
                onChange={field.onChange}
              />
            )}
            name="content"
          />
        </div>
        {errors.title?.type === 'required' && 'Escribi algo para comentar'}
        {errors.title?.type === 'maxLength' &&
          'Superaste el limite de 2000 caracteres'}
        {errors.title?.message}
        <div className="space-x-1">
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  );
};

export default EditArticleForm;
