//components
import Tilt from '@/js/components/shared/Tilt';

const TiltHookPage = () => (
  <div className="magnify-container">
    <h3>Hover over the image to tilt it</h3>
    <Tilt width={300} height={350}>
      <div className="content" />
    </Tilt>
  </div>
);

export default TiltHookPage;
