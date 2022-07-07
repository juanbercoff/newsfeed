import { VersionControlItemProps } from './version-control';
import ListBox from '../common/list-box';

const VersionControlMobile = ({
  article,
  articleHistory,
  articleVersionToDisplay,
  setArticleVersionToDisplay,
}: VersionControlItemProps) => {
  return (
    <div>
      <ListBox
        items={articleHistory}
        value={articleVersionToDisplay}
        extraValue={article}
        setValue={setArticleVersionToDisplay}
      />
    </div>
  );
};

export default VersionControlMobile;
