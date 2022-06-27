import { useState } from 'react';

const DepthChangerButton = ({
  cmd,
  activeIndex,
  handleMouseDown,
  className,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button className={className} type="button" onClick={handleMouseDown}>
      {cmd}
    </button>
  );
};

export default DepthChangerButton;
