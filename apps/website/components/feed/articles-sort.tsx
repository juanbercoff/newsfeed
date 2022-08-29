import RadioGroupComponent from '../common/radio-group/radio-group';
import RadioGroupItem from '../common/radio-group/radio-group-item';
import { GetArticleCondition } from '@newsfeed/data';
import { useTranslation } from 'next-i18next';

type ArticlesSorterProps = {
  condition: GetArticleCondition;
  setCondition: (condition: GetArticleCondition) => void;
};

const SORT_ITEMS = [
  {
    id: '1',
    value: 'latest',
  },
  {
    id: '2',
    value: 'top',
  },
  {
    id: '3',
    value: 'mostDiscussed',
  },
];

const ArticlesSorter = ({ condition, setCondition }: ArticlesSorterProps) => {
  //TODO this does not work, Module not found: Can't resolve 'cache-manager' bug?
  //getArticleCondition.concat();
  const { t } = useTranslation('common');
  return (
    <RadioGroupComponent
      items={SORT_ITEMS}
      setValue={setCondition}
      value={condition}
      label="Sort by"
      keyExtractor={(item) => item.id}
      isHorizontal={true}
      renderItem={(item) => (
        <RadioGroupItem
          use="button"
          item={item.value}
          itemLabel={t(item.value)}
        />
      )}
    />
  );
};
export default ArticlesSorter;
