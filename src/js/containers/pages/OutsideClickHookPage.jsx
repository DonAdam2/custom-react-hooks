import { useRef } from 'react';
//custom hooks
import useOutsideClick from '../../customHooks/UseOutsideClick';

const OutsideClickHookPage = () => {
  const ref = useRef();

  useOutsideClick(ref, () => {
    alert('You clicked outside');
  });

  return (
    <div className="container">
      <div ref={ref}>
        <h4>Click outside this div</h4>
      </div>
      <div>Other content</div>
    </div>
  );
};

export default OutsideClickHookPage;
