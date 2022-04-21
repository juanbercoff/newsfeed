import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CreateArticleDto,
  ArticlesWithLikesResponseDto,
  UpdateArticleDto,
} from '@newsfeed/data';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './article-form-style.module.css';
import { useEffect } from 'react';
import ArticleFormContent from './article-form-content';
import Button from '../components/common/button';
import { UseMutationResult } from 'react-query';
import { Article } from '@prisma/client';
import { useRouter } from 'next/router';

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
  article?: ArticlesWithLikesResponseDto;
  queryHook: (
    articleId?: string
  ) => UseMutationResult<Article, unknown, CreateArticleDto | UpdateArticleDto>;
};

const ArticleForm = ({ article, queryHook }: ArticleFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ArticleFormData>();
  const { push } = useRouter();

  const { mutate } = queryHook(article?.id);

  const [numberOfContentSections, setNumberOfContentSections] = useState(1);

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
    const data: CreateArticleDto = {
      title: formData.title,
      content: formData.content.map((content) => ({
        ...content,
      })),
    };
    console.log(data);

    mutate(data);
  };

  return (
    <div className="pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('title', {
              required: true,
              maxLength: 80,
              value: article?.title || '',
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
            : [...Array(numberOfContentSections).keys()].map(
                (content, index) => (
                  <ArticleFormContent
                    key={index}
                    register={register}
                    contentSectionNumber={index}
                    errors={errors}
                  />
                )
              )}
        </div>
        {errors.title?.type === 'required' && 'Escribi algo para comentar'}
        {errors.title?.type === 'maxLength' &&
          'Superaste el limite de 2000 caracteres'}
        <Button
          type="button"
          text="Agregar otra seccion"
          onClick={(e) => {
            e.preventDefault();
            setNumberOfContentSections(numberOfContentSections + 1);
          }}
        />
        <button
          type="submit"
          disabled={!!errors.title || !watch('title')}
          className={`text-white font-semibold py-1 px-3 rounded ${
            !watch('title') || errors.title
              ? 'bg-slate-200 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700  active:bg-blue-800'
          } `}
          onClick={() => console.log(errors)}
        >
          Comentar
        </button>
      </form>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default ArticleForm;
