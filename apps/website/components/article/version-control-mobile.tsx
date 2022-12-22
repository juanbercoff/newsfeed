import { VersionControlItemProps } from './version-control';
import ListBox from '../common/list-box/list-box';
import ListBoxItem from '../common/list-box/list-box-item';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const VersionControlMobile = ({
  article,
  articleHistory,
  articleVersionToDisplay,
  setArticleVersionToDisplay,
}: VersionControlItemProps) => {
  const [index, setIndex] = useState<number | null>(null);
  const { t } = useTranslation(['article']);
  return (
    <div>
      <ListBox
        position="bottom"
        items={articleHistory}
        value={articleVersionToDisplay}
        setValue={setArticleVersionToDisplay}
        label={index !== null ? `Version ${index + 1}` : t('latestVersion')}
        renderItem={(item, index) => (
          <ListBoxItem
            key={item.id}
            handleClick={() => setIndex(index)}
            item={item}
            itemLabel={`Version ${index + 1}`}
          />
        )}
        extraOption={
          <ListBoxItem
            key={article.id}
            handleClick={() => setIndex(null)}
            item={article}
            itemLabel={t('latestVersion')}
          />
        }
      />
    </div>
  );
};

export default VersionControlMobile;
