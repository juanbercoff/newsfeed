import { IconType } from 'react-icons';

interface LevelNumberIconProps {
  onClick: () => void;
  Icon: IconType;
  isActive: boolean;
}

const LevelNumberIcon = ({ onClick, Icon, isActive }: LevelNumberIconProps) => {
  return (
    <div
      className={`hover:bg-amber-300 cursor-pointer p-1 ${
        isActive ? 'bg-amber-700' : 'bg-transparent'
      }`}
      onClick={onClick}
    >
      <Icon size={18} />
    </div>
  );
};

export default LevelNumberIcon;
