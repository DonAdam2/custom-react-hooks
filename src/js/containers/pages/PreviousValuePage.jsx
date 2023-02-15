import usePreviousValue from '@/js/customHooks/usePreviousValue';
import { useState } from 'react';

const PreviousValuePage = () => {
  // State value and setter for our example
  const [count, setCount] = useState(0),
    // Get the previous value (was passed into hook on last render)
    prevCount = usePreviousValue(count);

  return (
    <div className="magnify-container">
      <p>This hook returns the previous value of props or state</p>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default PreviousValuePage;
