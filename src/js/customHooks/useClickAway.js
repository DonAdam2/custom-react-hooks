import { useEffect, useRef } from 'react';

const useClickAway = (ref, onOutsideClickCallback) => {
  const callbackRef = useRef(onOutsideClickCallback);

  useEffect(() => {
    callbackRef.current = onOutsideClickCallback;
  }, [onOutsideClickCallback]);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callbackRef.current();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);
};

export default useClickAway;
