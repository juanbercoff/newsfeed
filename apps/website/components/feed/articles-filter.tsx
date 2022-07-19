import RadioGroupComponent from '../common/radio-group/radio-group';
import RadioGroupItem from '../common/radio-group/radio-group-item';
import { GetArticleCondition } from '@newsfeed/data';

type ArticlesFilter = {
  condition: GetArticleCondition;
  setCondition: (condition: GetArticleCondition) => void;
};

const ArticlesFilter = ({ condition, setCondition }: ArticlesFilter) => {
  //TODO this does not work, Module not found: Can't resolve 'cache-manager' bug?
  //getArticleCondition.concat();
  return (
    <RadioGroupComponent
      items={['latest', 'top', 'mostDiscused']}
      setValue={setCondition}
      value={condition}
      label="Sort by"
      keyExtractor={(item) => item}
      isHorizontal={true}
      renderItem={(item) => (
        <RadioGroupItem
          item={item}
          itemLabel={item.charAt(0).toUpperCase() + item.slice(1)}
        />
      )}
    />
  );
};
export default ArticlesFilter;
