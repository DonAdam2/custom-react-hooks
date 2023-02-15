import { useLayoutEffect } from 'react';

function useLockScroll({ targetElement = document.body, immediate = true }) {
  useLayoutEffect(() => {
    // Get original element overflow
    const originalStyle = window.getComputedStyle(targetElement).overflow;
    if (immediate) {
      // Prevent scrolling on mount
      targetElement.style.overflow = 'hidden';
    }
    return () => {
      if (immediate) {
        // Re-enable scrolling when component unmounts
        targetElement.style.overflow = originalStyle;
      }
    };
  }, [immediate, targetElement]);
}

export default useLockScroll;
