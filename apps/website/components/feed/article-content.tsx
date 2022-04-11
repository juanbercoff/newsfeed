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
  setShowFirstLevel,
  showSecondLevel,
  setShowSecondLevel,
  firstLevelContent,
  secondLevelContent,
  thirdLevelContent,
}: ArticleContentProps) => {
  const handleShowFirstLevelClick = () => {
    setShowFirstLevel((prevShowFirstLevel: boolean) => {
      if (prevShowFirstLevel) {
        setShowSecondLevel(false);
        setShowFirstLevel(false);
      } else {
        setShowFirstLevel(true);
      }
    });
  };

  return (
    <div>
      <p
        className="rounded p-2 cursor-pointer hover:bg-slate-200 transition duration-100"
        onClick={handleShowFirstLevelClick}
      >
        {firstLevelContent}
      </p>
      <div>
        <p
          onClick={() => setShowSecondLevel(!showSecondLevel)}
          className={`overflow-hidden text-sm rounded cursor-pointer hover:bg-slate-200 transition-all ease-linear duration-100  text-gray-500  ${
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
