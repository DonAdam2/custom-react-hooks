import { useEffect, useState } from 'react';

const useTouchScreenDetect = () => {
  const isSSR = typeof window === 'undefined',
    [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    if (!isSSR) {
      setIsTouchScreen(
        'ontouchstart' in document.documentElement ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
      );
    }
  }, [isTouchScreen, isSSR]);

  return isTouchScreen;
};

export default useTouchScreenDetect;
