import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateArticleDto } from '@newsfeed/data';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './article-form-style.module.css';
import { useEffect } from 'react';
import ArticleFormContent from './article-form-content';
import Button from '../components/common/button';
import { useRouter } from 'next/router';
import { useCreateArticle } from '../hooks/useArticles';

export type ArticleFormData = {
  title: string;
  content: ArticleContentFormData[];
};

type ArticleContentFormData = {
  level1: string;
  level2: string;
  level3: string;
};

const NewArticleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
  } = useForm<ArticleFormData>({
    shouldUnregister: true,
  });
  const { push } = useRouter();

  const { mutate } = useCreateArticle(push);

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
              value: '',
            })}
            className={[
              'bg-transparent p-2 rounded min-h-[108px] text-3xl w-full',
              styles.input,
            ].join(' ')}
            placeholder="Titulo del articulo"
          ></input>
          {[...Array(numberOfContentSections).keys()].map((content, index) => (
            <ArticleFormContent
              key={index}
              register={register}
              contentSectionNumber={index}
              errors={errors}
            />
          ))}
        </div>
        {errors.title?.type === 'required' && 'Escribi algo para comentar'}
        {errors.title?.type === 'maxLength' &&
          'Superaste el limite de 2000 caracteres'}
        <div className="space-x-1">
          <Button type="submit">Publicar</Button>
          <Button
            type="button"
            onClick={() => {
              setNumberOfContentSections(numberOfContentSections + 1);
            }}
          >
            Agregar otra seccion
          </Button>
          <Button
            type="button"
            disabled={numberOfContentSections === 1}
            onClick={() => {
              setNumberOfContentSections(numberOfContentSections - 1);
            }}
          >
            Remover ultima seccion agregada
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewArticleForm;
