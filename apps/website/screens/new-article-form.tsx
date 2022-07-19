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
import ListBox from '../components/common/list-box/list-box';
import ListBoxItem from '../components/common/list-box/list-box-item';
import { Tag } from '@prisma/client';
import Skeleton from 'react-loading-skeleton';
import useBreakpoints from '../hooks/useBreakpoints';

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
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const onSubmit = (formData: ArticleFormData) => {
    const data: CreateArticleDto = {
      title: formData.title,
      content: Utils.parseHtml(formData.content),
      portraitImageUrl: selectedImage,
      tagId: formData.tag,
    };
    mutate({ data, authToken });
  };
  const { isXs } = useBreakpoints();
  if (isXs) push('/feed');

  if (isLoading) {
    return (
      <div>
        <Skeleton height={108} />
        <Skeleton height={42} />
        <Skeleton height={348} />
      </div>
    );
  }

  return (
    <div className="pt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-4">
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
          {errors.title?.type === 'required' && 'Escribi algo para comentar'}
          <UnsplashSearch
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
          />
          <Controller
            control={control}
            rules={{ minLength: 200, required: true }}
            render={({ field }) => (
              <ArticleFormContentEditor
                contentValue={field.value}
                onChange={field.onChange}
              />
            )}
            name="content"
          />
          {errors.content?.type === 'required' && 'Escribi algo para continuar'}
          {errors.content?.type === 'minLength' &&
            'Escribi al menos 200 caracteres para continuar'}
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ListBox
                position="top"
                items={tags}
                value={selectedTag}
                label={selectedTag?.name ?? 'Selecciona un tag'}
                setValue={(value) => {
                  setSelectedTag(value);
                  field.onChange(value.id);
                }}
                renderItem={(item) => (
                  <ListBoxItem
                    item={item}
                    itemLabel={item.name}
                    handleClick={() => ({})}
                  />
                )}
              />
            )}
            name="tag"
          />
          {errors?.tag?.type === 'required' &&
            'Selecciona un tag para continuar'}
        </div>
        <div>
          <Button type="submit">Publicar</Button>
        </div>
      </form>
    </div>
  );
};

export default NewArticleForm;
