import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import { FaRegCommentAlt } from 'react-icons/fa';

const Actions = () => {
  return (
    <div className="flex justify-start space-x-1 ">
      <GoArrowUp size={24} />
      <p className="font-medium">120</p>
      <GoArrowDown size={24} />
      <div className="pl-4 flex justify-center space-x-1 items-center">
        <FaRegCommentAlt size={17} />
        <p className="font-medium">30</p>
      </div>
    </div>
  );
};

export default Actions;
