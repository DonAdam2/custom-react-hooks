import { useEffect } from 'react';
//custom hooks
import usePageBottom from '../../customHooks/UsePageBottom';

const PageBottomHookPage = () => {
  const isBottom = usePageBottom();

  useEffect(() => {
    if (isBottom) {
      alert("You're at the bottom of the page");
    }
  }, [isBottom]);

  return (
    <div className="magnify-container">
      <p>
        This hook allows you to detect if you are at the bottom of the page. Can be used to
        implement infinite scroll functionality.
      </p>
      <h1 className="text-center">Scroll to the bottom of the page</h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default PageBottomHookPage;
