import { useForm } from 'react-hook-form';
import { UpdateArticleDto, ArticlesWithLikesResponseDto } from '@newsfeed/data';
import 'react-toastify/dist/ReactToastify.css';
import styles from './article-form-style.module.css';
import { useEffect } from 'react';
import ArticleFormContent from './article-form-content';
import Button from '../components/common/button';
import { useRouter } from 'next/router';
import { useUpdateArticle } from '../hooks/useArticles';

export type ArticleFormData = {
  title: string;
  content: ArticleContentFormData[];
};

type ArticleContentFormData = {
  level1: string;
  level2: string;
  level3: string;
};

type ArticleFormProps = {
  article: ArticlesWithLikesResponseDto;
};

const EditArticleForm = ({ article }: ArticleFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ArticleFormData>();
  const { push } = useRouter();

  const { mutate } = useUpdateArticle(article.id, push);

  useEffect(() => {
    document.querySelectorAll('textarea').forEach((element) => {
      element.addEventListener('paste', function (e) {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertHTML', false, text);
      });
    });
  }, []);

  const onSubmit = (formData: ArticleFormData) => {
    const data: UpdateArticleDto = {
      title: formData.title,
      content: formData.content.map((content) => ({
        ...content,
      })),
    };

    if (article.title === data.title) {
      const isEqual = article.articleContent.every((content, index) => {
        return (
          content.level1 === data.content[index].level1 &&
          content.level2 === data.content[index].level2 &&
          content.level3 === data.content[index].level3
        );
      });
      console.log('isEqual', isEqual);
      isEqual
        ? setError('notRegisteredInput', {
            type: 'custom',
            message: 'custom message',
          })
        : console.log('mutate');
    }
    console.log(article.articleContent);
    console.log(data.content);

    //mutate(data);
  };

  return (
    <div className="pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {article?.articleContent.length > 0
            ? article.articleContent.map((content, index) => (
                <ArticleFormContent
                  key={content.id}
                  register={register}
                  contentSectionNumber={index}
                  articleContent={content}
                  errors={errors}
                />
              ))
            : null}
        </div>
        {errors.title?.type === 'required' && 'Escribi algo para comentar'}
        {errors.title?.type === 'maxLength' &&
          'Superaste el limite de 2000 caracteres'}
        <div className="space-x-1">
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  );
};

export default EditArticleForm;
