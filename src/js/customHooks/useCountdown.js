import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_TIME_IN_SECONDS = 60;

const useCountdown = ({ initialCounter, callback }) => {
  const _initialCounter = initialCounter ?? DEFAULT_TIME_IN_SECONDS,
    [resume, setResume] = useState(0),
    [counter, setCounter] = useState(_initialCounter),
    callbackRef = useRef(callback),
    initial = useRef(_initialCounter),
    intervalRef = useRef(null),
    [isPause, setIsPause] = useState(false),
    isStopBtnDisabled = counter === 0,
    isPauseBtnDisabled = isPause || counter === 0,
    isResumeBtnDisabled = !isPause;

  const stopCounter = useCallback(() => {
    clearInterval(intervalRef.current);
    setCounter(0);
    setIsPause(false);
  }, []);

  const startCounter = useCallback(
    (seconds = initial.current) => {
      intervalRef.current = setInterval(() => {
        const newCounter = seconds--;
        if (newCounter >= 0) {
          setCounter(newCounter);
          callbackRef.current && callbackRef.current(newCounter);
        } else {
          stopCounter();
        }
      }, 1000);
    },
    [stopCounter]
  );

  const pauseCounter = () => {
    setResume(counter);
    setIsPause(true);
    clearInterval(intervalRef.current);
  };

  const resumeCounter = () => {
    startCounter(resume - 1);
    setResume(0);
    setIsPause(false);
  };

  const resetCounter = useCallback(() => {
    if (intervalRef.current) {
      stopCounter();
    }
    setCounter(initial.current);
    startCounter(initial.current - 1);
  }, [startCounter, stopCounter]);

  useEffect(() => {
    resetCounter();
  }, [resetCounter]);

  useEffect(() => {
    return () => {
      stopCounter();
    };
  }, [stopCounter]);

  return [
    counter,
    resetCounter,
    stopCounter,
    pauseCounter,
    resumeCounter,
    isStopBtnDisabled,
    isPauseBtnDisabled,
    isResumeBtnDisabled,
  ];
};

export default useCountdown;
