import { useEffect, useRef } from 'react';

function useTilt() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // used to unify the touch and click cases
    const unify = (e) => (e.changedTouches ? e.changedTouches[0] : e);

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      e.preventDefault();

      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = unify(e).clientX;
      state.mouseY = unify(e).clientY;

      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty('--px', px);
      el.style.setProperty('--py', py);
    };

    const handleMouseLeave = () => {
      el.style.setProperty('--px', 0.5);
      el.style.setProperty('--py', 0.5);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('touchmove', handleMouseMove);
    el.addEventListener('touchend', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('touchmove', handleMouseMove);
      el.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  return ref;
}

export default useTilt;
