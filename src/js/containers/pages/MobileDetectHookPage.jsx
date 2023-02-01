//custom hooks
import useMobileDetect from '../../customHooks/UseMobileDetect';

const MobileDetectHookPage = () => {
  const { isMobile } = useMobileDetect();

  return (
    <div className="magnify-container">
      <p>
        Are you accessing this site using a mobile? <strong>{isMobile ? 'Yes' : 'No'}</strong>
      </p>
    </div>
  );
};

export default MobileDetectHookPage;
