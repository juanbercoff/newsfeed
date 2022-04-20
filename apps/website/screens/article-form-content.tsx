import styles from './article-form-style.module.css';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { ArticleFormData } from './article-form';
import { ArticleContent } from '@prisma/client';

type ArticleFormContentProps = {
  register: UseFormRegister<ArticleFormData>;
  contentSectionNumber: number;
  articleContent?: ArticleContent;
};

const ArticleFormContent = ({
  register,
  contentSectionNumber,
  articleContent,
}: ArticleFormContentProps) => {
  return (
    <>
      <textarea
        {...register(`content.${contentSectionNumber}.level1`, {
          required: true,
          maxLength: 80,
          value: articleContent?.level1 || '',
        })}
        className="bg-transparent p-2 rounded min-h-[108px] text-lg w-full overflow-hidden border-2 resize-none focus:outline-none "
      />
      <textarea
        {...register(`content.${contentSectionNumber}.level2`, {
          required: true,
          maxLength: 80,
          value: articleContent?.level2 || '',
        })}
        className="bg-transparent p-2 rounded min-h-[108px] text-lg w-full overflow-hidden border-2 resize-none focus:outline-none"
      />
      <textarea
        {...register(`content.${contentSectionNumber}.level3`, {
          required: true,
          maxLength: 80,
          value: articleContent?.level3 || '',
        })}
        className="bg-transparent p-2 rounded min-h-[108px] text-lg w-full overflow-hidden border-2 resize-none focus:outline-none"
      />
    </>
  );
};

export default ArticleFormContent;
