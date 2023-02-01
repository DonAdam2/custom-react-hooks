import { useState } from 'react';
//custom hooks
import useInterval from '../../customHooks/UseInterval';

const IntervalHookPage = () => {
  const [counter, setCounter] = useState(30);

  const onStopHandler = () => {
    clearInterval(intervalRef.current);
  };

  const onResetHandler = () => {
    setCounter(30);
  };

  const intervalRef = useInterval(() => {
    if (counter > 1) {
      setCounter((prev) => prev - 1);
    } else {
      onResetHandler();
    }
  }, 1000);

  return (
    <div className="magnify-container">
      <p>Counter {counter}</p>
      <button onClick={onResetHandler}>Reset counter</button>
      <button onClick={onStopHandler}>Stop counter</button>
    </div>
  );
};

export default IntervalHookPage;
