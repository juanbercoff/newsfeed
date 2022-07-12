import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CreateArticleDto, ArticleFormData } from '@newsfeed/data';
import 'react-toastify/dist/ReactToastify.css';
import styles from './article-form-style.module.css';
import ArticleFormContentEditor from './article-form-content-editor';
import Button from '../components/common/button';
import { useRouter } from 'next/router';
import { useCreateArticle } from '../hooks/useArticles';
import UnsplashSearch from '../components/common/unsplash-search';
import Utils from '../utils/Utils';
import { useGetTags } from '../hooks/useTags';
import { useUserProfileContext } from '../contexts/user-context';

const NewArticleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ArticleFormData>({
    shouldUnregister: true,
  });
  const { push } = useRouter();
  const { authToken } = useUserProfileContext();
  const { mutate } = useCreateArticle(push);
  const { data: tags, isLoading } = useGetTags();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onSubmit = (formData: ArticleFormData) => {
    const data: CreateArticleDto = {
      title: formData.title,
      content: Utils.parseHtml(formData.content),
      portraitImageUrl: selectedImage,
    };
    mutate({ data, authToken });
  };

  return (
    <div className="pt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
          <UnsplashSearch
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <ArticleFormContentEditor
                contentValue={field.value}
                onChange={field.onChange}
              />
            )}
            name="content"
          />
        </div>
        {errors.title?.type === 'required' && 'Escribi algo para comentar'}
        {errors.title?.type === 'maxLength' &&
          'Superaste el limite de 2000 caracteres'}
        <div>
          <Button type="submit">Publicar</Button>
        </div>
      </form>
    </div>
  );
};

export default NewArticleForm;
