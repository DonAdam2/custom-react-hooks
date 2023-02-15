import { useLayoutEffect } from 'react';

function useLockScroll({ targetElement = document.body, immediate = true }) {
  useLayoutEffect(() => {
    // Get original element overflow
    const originalStyle = targetElement ? window.getComputedStyle(targetElement).overflow : 'auto';
    if (immediate && targetElement) {
      // Prevent scrolling on mount
      targetElement.style.overflow = 'hidden';
    }
    return () => {
      if (immediate && targetElement) {
        // Re-enable scrolling when component unmounts
        targetElement.style.overflow = originalStyle;
      }
    };
  }, [immediate, targetElement]);
}

export default useLockScroll;
