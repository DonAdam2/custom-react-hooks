import { useRef } from 'react';
//custom hooks
import useClickAway from '@/js/customHooks/useClickAway';

const ClickAwayWrapper = ({ children, onClickAwayCallback, className = '' }) => {
  const wrapperRef = useRef(null);
  useClickAway(wrapperRef, onClickAwayCallback);

  return (
    <span className={className} ref={wrapperRef}>
      {children}
    </span>
  );
};

export default ClickAwayWrapper;
