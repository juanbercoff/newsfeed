import { IconType } from 'react-icons';

interface DepthNumberIconProps {
  onClick: () => void;
  Icon: IconType;
  isActive: boolean;
}

const DepthNumberIcon = ({ onClick, Icon, isActive }: DepthNumberIconProps) => {
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

export default DepthNumberIcon;
