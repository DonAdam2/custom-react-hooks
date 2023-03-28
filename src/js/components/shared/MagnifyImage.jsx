import useMagnify from '@/js/customHooks/UseMagnify';

const MagnifyImage = ({
  imageUrl,
  imageWrapperWidth,
  imageWrapperHeight,
  magnifyTimes = 1.1,
  animationDuration = '0.2s',
}) => {
  const ref = useMagnify({ magnifyTimes, animationDuration });

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
