import { useEffect, useRef } from 'react';

function useMagnify({ magnifyTimes = 1.1, animationDuration = '0.2s' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // used to unify the touch and click cases
    const unify = (e) => (e.changedTouches ? e.changedTouches[0] : e);

    const state = {
      src: undefined,
      ratio: undefined,
      imgWidth: undefined,
    };

    let el = ref.current;

    Object.assign(el.style, {
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
    });

    const handleEndEvent = () => {
      Object.assign(el.style, {
        backgroundPosition: 'center',
        backgroundSize: '100%',
        transition: `background-size ${animationDuration} ease-out, background-position ${animationDuration} ease-out`,
      });
    };

    const handleMoveEvent = (e) => {
      e.preventDefault();

      const boxWidth = el.clientWidth,
        xPos = unify(e).pageX - el.offsetLeft,
        yPos = unify(e).pageY - el.offsetTop;

      const xPercent = `${xPos / (boxWidth / 100)}%`,
        yPercent = `${yPos / ((boxWidth * state.ratio) / 100)}%`;

      Object.assign(el.style, {
        backgroundPosition: `${xPercent} ${yPercent}`,
        transition: `background-size ${animationDuration} ease-out`,
        backgroundSize: `${state.imgWidth * magnifyTimes}px`,
      });
    };

    const getImageRatio = () => {
      if (!el) {
        return;
      }
      if (!state.src) {
        let imageSrc = el.currentStyle || window.getComputedStyle(el, false);
        state.src = imageSrc.backgroundImage.slice(4, -1).replace(/"/g, '');
      }
      const img = new Image();
      img.src = state.src;

      img.onload = () => {
        const imgWidth = img.naturalWidth,
          imgHeight = img.naturalHeight;
        state.ratio = imgHeight / imgWidth;
        state.imgWidth = imgWidth;

        el.addEventListener('mousemove', handleMoveEvent);
        el.addEventListener('mouseleave', handleEndEvent);
        el.addEventListener('touchmove', handleMoveEvent);
        el.addEventListener('touchend', handleEndEvent);
      };
    };

    getImageRatio();

    return () => {
      el.removeEventListener('mousemove', handleMoveEvent);
      el.removeEventListener('mouseleave', handleEndEvent);
      el.removeEventListener('touchmove', handleMoveEvent);
      el.removeEventListener('touchend', handleEndEvent);
    };
  }, [magnifyTimes, animationDuration]);

  return ref;
}

export default useMagnify;
