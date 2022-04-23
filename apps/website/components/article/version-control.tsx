import { RadioGroup } from '@headlessui/react';
import {
  ArticlesWithLikesResponseDto,
  ArticleHistoryDto,
} from '@newsfeed/data';
import VersionControlItem from './version-control-item';

type VersionControlItemProps = {
  article: ArticlesWithLikesResponseDto;
  articleHistory: ArticleHistoryDto[];
  articleVersionToDisplay: ArticlesWithLikesResponseDto | ArticleHistoryDto;
  setArticleVersionToDisplay: (
    article: ArticlesWithLikesResponseDto | ArticleHistoryDto
  ) => void;
};

const VersionControl = ({
  article,
  articleHistory,
  articleVersionToDisplay,
  setArticleVersionToDisplay,
}: VersionControlItemProps) => {
  return (
    <div className="max-w-md shadow hover:shadow-md bg-white">
      <RadioGroup
        value={articleVersionToDisplay}
        onChange={setArticleVersionToDisplay}
      >
        <RadioGroup.Label className="sr-only">Article Version</RadioGroup.Label>
        {articleHistory?.length > 0
          ? articleHistory.map((articleHistory, index) => (
              <VersionControlItem
                key={articleHistory.id}
                versionNumber={index + 1}
                createdDate={articleHistory.createdAt}
                articleVersionToDisplay={articleHistory}
              />
            ))
          : null}
        <VersionControlItem
          versionNumber="final"
          createdDate={article.createdAt}
          articleVersionToDisplay={article}
        />
      </RadioGroup>
    </div>
  );
};

export default VersionControl;
