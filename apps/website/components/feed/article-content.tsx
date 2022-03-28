import { Dispatch, SetStateAction } from 'react';

interface ArticleContentProps {
  showFirstLevel: boolean;
  setShowFirstLevel: (value: boolean | ((prevState: boolean) => void)) => void;
  showSecondLevel: boolean;
  setShowSecondLevel: (showSecondLevel: boolean) => void;
}

const ArticleContent = ({
  showFirstLevel,
  setShowFirstLevel,
  showSecondLevel,
  setShowSecondLevel,
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a euismod
        tortor, quis faucibus tellus. Nunc a risus faucibus, eleifend turpis eu,
        varius mauris. Nullam efficitur magna non ipsum hendrerit convallis.
        Quisque elit est, malesuada et consectetur blandit, efficitur sit.
      </p>
      <div>
        <p
          onClick={() => setShowSecondLevel(!showSecondLevel)}
          className={`text-sm rounded cursor-pointer hover:bg-slate-200 transition-all ease-linear duration-100  text-gray-500  ${
            showFirstLevel
              ? 'opacity-100 max-h-60 p-2 mx-2'
              : ' opacity-0 max-h-0'
          } `}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
        <p
          className={`text-sm text-gray-600  ${
            showSecondLevel
              ? `opacity-100 max-h-60 p-2 mx-4`
              : 'opacity-0 max-h-0'
          } transition-all ease-in-out duration-200`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default ArticleContent;
