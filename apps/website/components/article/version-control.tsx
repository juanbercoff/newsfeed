import { RadioGroup } from '@headlessui/react';
import { ArticleResponseDto, ArticleHistoryDto } from '@newsfeed/data';
import RadioGroupComponent from '../common/radio-group/radio-group';
import RadioGroupItem from '../common/radio-group/radio-group-item';
import Utils from '../../utils/Utils';
import { useTranslation } from 'next-i18next';

export type VersionControlItemProps = {
  article: ArticleResponseDto;
  articleHistory: ArticleHistoryDto[];
  articleVersionToDisplay: ArticleResponseDto | ArticleHistoryDto;
  setArticleVersionToDisplay: (
    article: ArticleResponseDto | ArticleHistoryDto
  ) => void;
};

const VersionControl = ({
  article,
  articleHistory,
  articleVersionToDisplay,
  setArticleVersionToDisplay,
}: VersionControlItemProps) => {
  const { t } = useTranslation('article');
  return (
    <div className="shadow hover:shadow-md bg-white">
      <RadioGroupComponent
        items={articleHistory}
        value={articleVersionToDisplay}
        setValue={setArticleVersionToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={(item, index) => (
          <RadioGroupItem
            use="radio"
            item={item}
            itemLabel={`Version ${index + 1}`}
            description={Utils.formatDateTimeRelative(item.createdAt)}
          />
        )}
        label="Article Version"
        extraOption={
          <RadioGroupItem
            use="radio"
            item={article}
            itemLabel={t('latestVersion')}
            description={Utils.formatDateTimeRelative(article.createdAt)}
          />
        }
      />
    </div>
  );
};

export default VersionControl;
