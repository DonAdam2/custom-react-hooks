import useTimer from '@/js/customHooks/UseTimer';
import Button from '@/js/components/shared/Button';

const TimerController = () => {
  const {
    renderedStreamDuration,
    isStartBtnDisabled,
    isStopBtnDisabled,
    isPauseBtnDisabled,
    isResumeBtnDisabled,
    startHandler,
    stopHandler,
    pauseHandler,
    resumeHandler,
  } = useTimer();

  return (
    <div className="timer-controller-wrapper">
      <div className="timer-display">{renderedStreamDuration}</div>
      <div className="buttons-wrapper">
        <Button
          onClick={startHandler}
          disabled={isStartBtnDisabled}
          label="Start"
          variant="white"
        />
        <Button label="Stop" disabled={isStopBtnDisabled} onClick={stopHandler} variant="danger" />
        <Button
          label="Pause"
          disabled={isPauseBtnDisabled}
          onClick={pauseHandler}
          variant="white"
        />
        <Button
          label="Resume"
          disabled={isResumeBtnDisabled}
          onClick={resumeHandler}
          variant="white"
        />
      </div>
    </div>
  );
};

export default TimerController;
