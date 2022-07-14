import { useGetTags } from '../../hooks/useTags';
import Spinner from '../common/spinner';
import TagItem from '../common/tag-item';
import { useState } from 'react';
import { Tag } from '@prisma/client';

type FilterBarTags = {
  allTags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
};

const FilterBar = ({
  allTags,
  selectedTags,
  setSelectedTags,
}: FilterBarTags) => {
  const handleTagClick = (tag: Tag) => {
    if (selectedTags?.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      selectedTags
        ? setSelectedTags([...selectedTags, tag])
        : setSelectedTags([tag]);
    }
  };

  const isTagSelected = (tag: Tag) => selectedTags?.includes(tag);

  return (
    <div className="flex align-center gap-2 p-5 flex-wrap">
      {allTags?.map((tag) => (
        <div
          key={tag.id}
          className="cursor-pointer"
          onClick={() => handleTagClick(tag)}
        >
          <TagItem tag={tag} textSize="sm" isSelected={isTagSelected(tag)} />
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
