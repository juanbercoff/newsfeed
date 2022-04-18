import { RiNumber0, RiNumber1, RiNumber2 } from 'react-icons/ri';
import LevelNumberIcon from './depth-number-icon';

type DepthSelectorProps = {
  setActiveIndex: (index: number) => void;
  activeIndex: number;
  setShowFirstLevel: (shouldOpen: boolean) => void;
  setShowSecondLevel: (shouldOpen: boolean) => void;
  handleLevels: (shouldOpen: boolean) => void;
};

const DepthSelector = ({
  setActiveIndex,
  setShowFirstLevel,
  setShowSecondLevel,
  handleLevels,
  activeIndex,
}: DepthSelectorProps) => {
  return (
    <div className="flex space-x-2 px-2">
      <p>Profundidad</p>
      <LevelNumberIcon
        onClick={() => {
          setActiveIndex(0);
          handleLevels(false);
        }}
        Icon={RiNumber0}
        isActive={activeIndex === 0}
      />
      <LevelNumberIcon
        onClick={() => {
          setActiveIndex(1);
          setShowFirstLevel(true);
          setShowSecondLevel(false);
        }}
        Icon={RiNumber1}
        isActive={activeIndex === 1}
      />
      <LevelNumberIcon
        onClick={() => {
          setActiveIndex(2);
          handleLevels(true);
        }}
        Icon={RiNumber2}
        isActive={activeIndex === 2}
      />
    </div>
  );
};

export default DepthSelector;
