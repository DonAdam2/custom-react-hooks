//custom hooks
import useTilt from '../../customHooks/UseTilt';

const TiltHookPage = () => {
  const ref = useTilt();

  return (
    <div className="magnify-container">
      <h3>Hover over the image to tilt it</h3>
      <div className="card" ref={ref} />
    </div>
  );
};

export default TiltHookPage;
