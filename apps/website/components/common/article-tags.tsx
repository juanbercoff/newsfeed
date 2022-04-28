import { ArticleTag, Tag } from '@prisma/client';

type ArticleTagsProps = {
  articleTag: (ArticleTag & {
    tag: Tag;
  })[];
};

const ArticleTags = ({ articleTag }: ArticleTagsProps) => {
  return (
    <div className="flex space-x-1 flex-wrap">
      {articleTag.map((tag) => (
        <div
          className="text-xs bg-slate-500 rounded-lg px-1 w-fit text-white"
          key={tag.id}
        >
          {tag.tag.tag}
        </div>
      ))}
    </div>
  );
};

export default ArticleTags;
