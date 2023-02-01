//components
import MagnifyImage from '@/js/components/shared/MagnifyImage';

const MagnifyHookPage = () => (
  <div className="magnify-container">
    <h3>Hover over the images or touch it, to zoom in</h3>
    <MagnifyImage
      magnifyTimes={1.1} //specify how much you want to magnify your image (default: 1.1)
      imageUrl="https://picsum.photos/id/234/500/600" //set image URL (required)
      imageWrapperWidth={250} //specify the width of the wrapper (required, make sure that it is smaller than image width to not loos image quality)
      imageWrapperHeight={300} //specify the height of the wrapper (required, make sure that it is smaller than image height to not loos image quality)
    />
  </div>
);

export default MagnifyHookPage;
