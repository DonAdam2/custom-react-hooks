import { useEffect } from 'react';

const useClickAway = (ref, onOutsideClickCallback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onOutsideClickCallback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useClickAway;
