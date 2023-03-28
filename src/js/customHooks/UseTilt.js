import { useEffect, useRef } from 'react';

function useTilt(animationDuration = '150ms') {
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

    const handleEnterEvent = () => {
      el.style.transition = `transform ${animationDuration} ease-out`;
    };

    const handleMoveEvent = (e) => {
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

      el.style.setProperty('--px', px.toFixed(2));
      el.style.setProperty('--py', py.toFixed(2));
    };

    const handleEndEvent = () => {
      el.style.setProperty('--px', 0.5);
      el.style.setProperty('--py', 0.5);
      el.style.transition = `transform ${animationDuration} ease-in`;
    };

    el.addEventListener('mouseenter', handleEnterEvent);
    el.addEventListener('mousemove', handleMoveEvent);
    el.addEventListener('mouseleave', handleEndEvent);
    el.addEventListener('touchstart', handleEnterEvent);
    el.addEventListener('touchmove', handleMoveEvent);
    el.addEventListener('touchend', handleEndEvent);

    return () => {
      el.removeEventListener('mouseenter', handleEnterEvent);
      el.removeEventListener('mousemove', handleMoveEvent);
      el.removeEventListener('mouseleave', handleEndEvent);
      el.removeEventListener('touchstart', handleEnterEvent);
      el.removeEventListener('touchmove', handleMoveEvent);
      el.removeEventListener('touchend', handleEndEvent);
    };
  }, [animationDuration]);

  return ref;
}

export default useTilt;
