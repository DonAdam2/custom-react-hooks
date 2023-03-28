import { useEffect, useRef } from 'react';

function useMagnify(magnifyTimes) {
  const ref = useRef(null),
    animationDuration = '0.2s';

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
      transition: `background-size ${animationDuration} ease-in, background-position ${animationDuration} ease-in`,
    });

    const handleMouseLeave = () => {
      Object.assign(el.style, {
        backgroundPosition: 'center',
        backgroundSize: '100%',
      });
    };

    const handleMouseMove = (e) => {
      e.preventDefault();

      const boxWidth = el.clientWidth,
        xPos = unify(e).pageX - el.offsetLeft,
        yPos = unify(e).pageY - el.offsetTop;

      const xPercent = `${xPos / (boxWidth / 100)}%`,
        yPercent = `${yPos / ((boxWidth * state.ratio) / 100)}%`;

      Object.assign(el.style, {
        backgroundPosition: `${xPercent} ${yPercent}`,
        transition: `background-size ${animationDuration} ease-out, background-position ${animationDuration} ease-out`,
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

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('touchmove', handleMouseMove);
        el.addEventListener('touchend', handleMouseLeave);
      };
    };

    getImageRatio();

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('touchmove', handleMouseMove);
      el.removeEventListener('touchend', handleMouseLeave);
    };
  }, [magnifyTimes]);

  return ref;
}

export default useMagnify;
