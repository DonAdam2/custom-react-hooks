import { useRef } from 'react';
//custom hooks
import useClickAway from '../../customHooks/useClickAway';

const OutsideClickHookPage = () => {
  const ref = useRef();

  useClickAway(ref, () => {
    alert('You clicked outside');
  });

  return (
    <div className="magnify-container">
      <p>This hook allows you to trigger an event on the required element if clicked outside</p>
      <div ref={ref}>
        <h4>Click outside this div</h4>
      </div>
      <div>Other content</div>
    </div>
  );
};

export default OutsideClickHookPage;
