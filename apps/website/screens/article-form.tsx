import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateArticleDto } from '@newsfeed/data';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateArticle } from '../hooks/useArticles';
import styles from './article-form-style.module.css';
import { useEffect } from 'react';
import ArticleFormContent from './article-form-content';
import { ArticlesWithLikesResponseDto } from '@newsfeed/data';

export type ArticleFormData = {
  title: string;
  content: ArticleContentFormData[];
};

type ArticleContentFormData = {
  level1: string;
  level2: string;
  level3: string;
  version: number;
};

type ArticleFormProps = {
  article: ArticlesWithLikesResponseDto
};

const ArticleForm = ({ article }: ArticleFormProps) => {
  article.articleContent[0].
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ArticleFormData>();

  const { mutate } = useCreateArticle(reset);
  const [numberOfContentSections, setNumberOfContentSections] = useState(1);
  const [articleContent, setArticleContent] = useState<JSX.Element[]>([
    <ArticleFormContent register={register} contentSectionNumber={0} />,
  ]);

  const onSubmit = (formData: ArticleFormData) => {
    const data: CreateArticleDto = {
      title: formData.title,
      content: formData.content.map((content) => ({
        ...content,
        version,
      })),
    };
    console.log(formData);

    mutate(data);
  };
  useEffect(() => {
    document.querySelectorAll('textarea').forEach((element) => {
      element.addEventListener('paste', function (e) {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertHTML', false, text);
      });
    });
  }, []);

  return (
    <div className="pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('title', { required: true, maxLength: 80 })}
            className={[
              'bg-transparent p-2 rounded min-h-[108px] text-3xl w-full',
              styles.input,
            ].join(' ')}
            placeholder="Titulo del articulo"
          ></input>
          {articleContent.map((content, index) => {
            return content;
          })}
        </div>
        {errors.title?.type === 'required' && 'Escribi algo para comentar'}
        {errors.title?.type === 'maxLength' &&
          'Superaste el limite de 2000 caracteres'}
        <button
          className={`text-white font-semibold py-1 px-3 rounded ${
            !watch('title') || errors.title
              ? 'bg-slate-200 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700  active:bg-blue-800'
          } `}
          onClick={(e) => {
            e.preventDefault();
            setArticleContent([
              ...articleContent,
              <ArticleFormContent
                register={register}
                contentSectionNumber={numberOfContentSections}
              />,
            ]);
            setNumberOfContentSections(numberOfContentSections + 1);
          }}
        >
          Agregar otra seccion
        </button>
        <button
          type="submit"
          disabled={!!errors.title || !watch('title')}
          className={`text-white font-semibold py-1 px-3 rounded ${
            !watch('title') || errors.title
              ? 'bg-slate-200 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700  active:bg-blue-800'
          } `}
        >
          Comentar
        </button>
      </form>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default ArticleForm;
