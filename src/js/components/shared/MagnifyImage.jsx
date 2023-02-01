import useMagnify from '@/js/customHooks/UseMagnify';

const MagnifyImage = ({ imageUrl, imageWrapperWidth, imageWrapperHeight, magnifyTimes = 1.1 }) => {
  const ref = useMagnify(magnifyTimes);

  return (
    <div
      className="zoom"
      style={{
        backgroundImage: `url(${imageUrl})`,
        width: imageWrapperWidth,
        height: imageWrapperHeight,
      }}
      ref={ref}
    />
  );
};

export default MagnifyImage;
