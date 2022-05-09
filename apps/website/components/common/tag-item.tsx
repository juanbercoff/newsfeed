import { Tag } from '@prisma/client';

type TagItemProps = {
  tag: Tag;
  textSize?: 'xs' | 'sm' | 'md';
  isSelected?: boolean;
};

const TagItem = ({
  tag,
  textSize = 'xs',
  isSelected = false,
}: TagItemProps) => {
  return (
    <div
      key={tag.id}
      className={`text-${textSize} ${
        isSelected ? 'bg-gray-400' : 'bg-gray-200'
      } rounded-lg px-1.5 py-0.5 w-fit text-black select-none`}
    >
      {tag.name}
    </div>
  );
};

export default TagItem;
