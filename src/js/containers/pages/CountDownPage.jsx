import useCountdown from '@/js/customHooks/useCountdown';
import Button from '@/js/components/shared/Button';

const CountDownPage = () => {
  //you can pass the required time in seconds and a callback function which gets the current counter as an argument
  // const [counter, resetCounter, stopCounter] = useCountdown({initialCounter: 20, callback: (currentCounter) => console.log('current counter', currentCounter)});
  const [
    counter,
    resetCounter,
    stopCounter,
    pauseCounter,
    resumeCounter,
    isStopBtnDisabled,
    isPauseBtnDisabled,
    isResumeBtnDisabled,
  ] = useCountdown({});

  const stop = () => {
    stopCounter();
  };

  const reset = () => {
    resetCounter();
  };

  const pause = () => {
    pauseCounter();
  };

  const resume = () => {
    resumeCounter();
  };

  return (
    <div className="magnify-container">
      <div className="buttons-wrapper">
        <Button onClick={stop} disabled={isStopBtnDisabled} label="Stop" variant="danger" />
        <Button onClick={reset} label="Reset" variant="ghost" />
        <Button onClick={pause} disabled={isPauseBtnDisabled} label="Pause" variant="ghost" />
        <Button onClick={resume} disabled={isResumeBtnDisabled} label="Resume" variant="ghost" />
      </div>
      {<p>Current counter is {counter}</p>}
    </div>
  );
};

export default CountDownPage;
