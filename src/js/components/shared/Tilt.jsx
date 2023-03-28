import useTilt from '@/js/customHooks/UseTilt';

const Tilt = ({ width, height, children }) => {
  //animationDuration => used to modify the animation duration
  const ref = useTilt();

  return (
    <div className="tilt-element" ref={ref} style={{ width, height }}>
      {children}
    </div>
  );
};

export default Tilt;
