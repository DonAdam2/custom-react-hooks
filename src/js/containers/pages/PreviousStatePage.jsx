import usePreviousState from '@/js/customHooks/usePreviousState';
import { useState } from 'react';

const PreviousStatePage = () => {
  // State value and setter for our example
  const [count, setCount] = useState(0),
    // Get the previous value (was passed into hook on last render)
    prevCount = usePreviousState(count);

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

export default PreviousStatePage;
