import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CreateArticleDto, ArticleFormData, Tag } from '@newsfeed/data';
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
import Skeleton from 'react-loading-skeleton';
import useBreakpoints from '../hooks/useBreakpoints';
import { getTag } from '../services/tags-api';
import { useTranslation, UseTranslation } from 'next-i18next';

export const FORM_KEYS = {
  title: 'articleTitle',
  content: 'articleContent',
  image: 'articleImage',
  tag: 'articleTag',
};

const NewArticleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<ArticleFormData>({
    shouldUnregister: true,
  });
  const { push } = useRouter();
  const { authToken } = useUserProfileContext();
  const {
    mutate,
    isError,
    isLoading: isCreatingLoading,
  } = useCreateArticle(push);
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

  const { t } = useTranslation('article');

  const setDefaultContentValue = () => {
    let localStorageContentValue = localStorage.getItem(FORM_KEYS.content);
    localStorageContentValue =
      localStorageContentValue === 'null' ||
      localStorageContentValue === 'undefined'
        ? ''
        : localStorageContentValue;
    return localStorageContentValue;
  };

  useEffect(() => {
    const localStorageTitle = localStorage.getItem(FORM_KEYS.title);
    setValue('title', Utils.falsyStorageTransformer(localStorageTitle, ''));
    const localStorageContent = localStorage.getItem(FORM_KEYS.content);
    setValue('content', Utils.falsyStorageTransformer(localStorageContent, ''));
    let localStorageImageUrl = localStorage.getItem(FORM_KEYS.image);
    localStorageImageUrl = Utils.falsyStorageTransformer(
      localStorageImageUrl,
      null
    );

    setValue('portraitImageUrl', localStorageImageUrl);
    setSelectedImage(localStorageImageUrl);

    let localStorageTag = localStorage.getItem(FORM_KEYS.tag);

    localStorageTag = Utils.falsyStorageTransformer(localStorageTag, null);
    (async function () {
      if (!localStorageTag) return;
      const tag = await getTag(localStorageTag);
      setSelectedTag(tag);
      setValue('tag', localStorageTag);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem(FORM_KEYS.title, watch('title'));
    localStorage.setItem(FORM_KEYS.content, watch('content'));
    localStorage.setItem(FORM_KEYS.image, selectedImage);
    localStorage.setItem(FORM_KEYS.tag, selectedTag?.id);
  }, [watch('title'), watch('content'), selectedImage, selectedTag]);

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
            placeholder={t('titlePlaceholder')}
          ></input>
          {errors.title?.type === 'required' && 'Escribi algo para comentar'}
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <UnsplashSearch
                setSelectedImage={(image) => {
                  setSelectedImage(image);
                  field.onChange(image);
                }}
                selectedImage={selectedImage}
              />
            )}
            name="portraitImageUrl"
          />
          <div>
            {errors.portraitImageUrl?.type === 'required' &&
              'Seleciona una imagen para continuar'}
          </div>
          <Controller
            control={control}
            rules={{ minLength: 200, required: true }}
            defaultValue={setDefaultContentValue()}
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
                label={selectedTag?.name ?? t('tagPlaceholder')}
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
          <Button type="submit" isLoading={isCreatingLoading}>
            Publicar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewArticleForm;
