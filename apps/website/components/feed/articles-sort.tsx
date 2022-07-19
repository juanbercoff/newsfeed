import RadioGroupComponent from '../common/radio-group/radio-group';
import RadioGroupItem from '../common/radio-group/radio-group-item';
import { GetArticleCondition } from '@newsfeed/data';

type ArticlesSorterProps = {
  condition: GetArticleCondition;
  setCondition: (condition: GetArticleCondition) => void;
};

const SORT_ITEMS = [
  {
    id: '1',
    value: 'latest',
    label: 'Más nuevos',
  },
  {
    id: '2',
    value: 'top',
    label: 'Más votados',
  },
  {
    id: '3',
    value: 'mostDiscused',
    label: 'Más Discutidos',
  },
];

const ArticlesSorter = ({ condition, setCondition }: ArticlesSorterProps) => {
  //TODO this does not work, Module not found: Can't resolve 'cache-manager' bug?
  //getArticleCondition.concat();
  return (
    <RadioGroupComponent
      items={SORT_ITEMS}
      setValue={setCondition}
      value={condition}
      label="Sort by"
      keyExtractor={(item) => item.id}
      isHorizontal={true}
      renderItem={(item) => (
        <RadioGroupItem use="button" item={item.value} itemLabel={item.label} />
      )}
    />
  );
};
export default ArticlesSorter;
