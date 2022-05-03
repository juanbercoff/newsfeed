import { UseFormRegister, FieldError } from 'react-hook-form';
import { ArticleFormData } from './new-article-form';
import { ArticleContent } from '@prisma/client';
import FormError from '../components/common/form-error';

type ArticleFormContentProps = {
  register: UseFormRegister<ArticleFormData>;
  contentSectionNumber: number;
  articleContent?: ArticleContent;
  errors: {
    title?: FieldError;
    content?: {
      level1?: FieldError;
      level2?: FieldError;
      level3?: FieldError;
      version?: FieldError;
    }[];
  };
};

const ArticleFormContent = ({
  register,
  contentSectionNumber,
  articleContent,
  errors,
}: ArticleFormContentProps) => {
  return (
    <>
      <textarea
        {...register(`content.${contentSectionNumber}.level1`, {
          required: true,
          maxLength: 800,
          value: articleContent?.level1 || '',
        })}
        className="bg-transparent p-2 rounded min-h-[108px] text-lg w-full overflow-hidden border-2 !resize-none outline-none"
      />
      <FormError>
        {errors.content?.[contentSectionNumber]?.level1?.type === 'maxLength' &&
          'Superaste el limite de 800 caracteres'}
        {errors.content?.[contentSectionNumber]?.level1?.type === 'required' &&
          'Este campo es requerido'}
      </FormError>
      <textarea
        {...register(`content.${contentSectionNumber}.level2`, {
          required: true,
          maxLength: 800,
          value: articleContent?.level2 || '',
        })}
        className="bg-transparent p-2 rounded min-h-[108px] text-lg w-full overflow-hidden border-2 resize-none focus:outline-none"
      />
      {errors.content?.[contentSectionNumber]?.level2?.type === 'maxLength' &&
        'Superaste el limite de 800 caracteres'}
      {errors.content?.[contentSectionNumber]?.level2?.type === 'required' &&
        'Este campo es requerido'}
      <textarea
        {...register(`content.${contentSectionNumber}.level3`, {
          required: true,
          maxLength: 800,
          value: articleContent?.level3 || '',
        })}
        className="bg-transparent p-2 rounded min-h-[108px] text-lg w-full overflow-hidden border-2 resize-none focus:outline-none"
      />
      {errors.content?.[contentSectionNumber]?.level3?.type === 'maxLength' &&
        'Superaste el limite de 800 caracteres'}
      {errors.content?.[contentSectionNumber]?.level3?.type === 'required' &&
        'Este campo es requerido'}
    </>
  );
};

export default ArticleFormContent;
