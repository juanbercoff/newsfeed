import { ArticleTag, Tag } from '@newsfeed/data';
import TagItem from '../common/tag-item';

type ArticleTagsProps = {
  articleTag: (ArticleTag & {
    tag: Tag;
  })[];
};

const ArticleTags = ({ articleTag }: ArticleTagsProps) => {
  return (
    <div className="flex space-x-1 flex-wrap">
      {articleTag?.map((tag) => (
        <TagItem key={tag.id} tag={tag.tag} />
      ))}
    </div>
  );
};

export default ArticleTags;
