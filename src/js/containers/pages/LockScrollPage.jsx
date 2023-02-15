import { useState } from 'react';
import useLockScroll from '@/js/customHooks/useLockScroll';

const LockScrollPage = () => {
  const [showScroll, setShowScroll] = useState(false);

  // useLockScroll({immediate: show, targetElement: document.getElementById('app')})
  useLockScroll({ immediate: showScroll });

  const toggleScroll = () => {
    setShowScroll((prev) => !prev);
  };

  return (
    <div className="magnify-container">
      <p>
        Sometimes you want to prevent your users from being able to scroll the body of your page
        while a particular component is absolutely positioned over your page (think of a modal)
      </p>
      <button onClick={toggleScroll}>Toggle scroll</button>
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

export default LockScrollPage;
