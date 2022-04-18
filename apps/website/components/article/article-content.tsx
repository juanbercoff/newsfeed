interface ArticleContentProps {
  showFirstLevel: boolean;
  setShowFirstLevel: (value: boolean | ((prevState: boolean) => void)) => void;
  firstLevelContent: string;
  showSecondLevel: boolean;
  setShowSecondLevel: (showSecondLevel: boolean) => void;
  secondLevelContent: string;
  thirdLevelContent: string;
}

const ArticleContent = ({
  showFirstLevel,
  showSecondLevel,
  firstLevelContent,
  secondLevelContent,
  thirdLevelContent,
}: ArticleContentProps) => {
  return (
    <div>
      <p className="rounded p-2 transition duration-100">{firstLevelContent}</p>
      <div>
        <p
          className={`overflow-hidden text-sm rounded transition-all ease-linear duration-100  text-gray-500  ${
            showFirstLevel
              ? 'opacity-100 max-h-60 p-2 mx-2'
              : ' opacity-0 max-h-0'
          } `}
        >
          {secondLevelContent}
        </p>
        <p
          className={`overflow-hidden text-sm text-gray-600  ${
            showSecondLevel
              ? `opacity-100 max-h-60 p-2 mx-4`
              : 'opacity-0 max-h-0'
          } transition-all ease-in-out duration-200`}
        >
          {thirdLevelContent}
        </p>
      </div>
    </div>
  );
};

export default ArticleContent;
