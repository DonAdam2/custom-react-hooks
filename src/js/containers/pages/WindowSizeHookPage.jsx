//custom hooks
import useWindowSize from '../../customHooks/UseWindowSize';

const WindowSizeHookPage = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="magnify-container">
      <p>This hook returns the width and the height of the window</p>
      <p>Page width is: {width}</p>
      <p>Page height is: {height}</p>
    </div>
  );
};

export default WindowSizeHookPage;
