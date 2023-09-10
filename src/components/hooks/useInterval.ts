import { useEffect, useRef } from 'react';

type callbackFCType = () => void;

const useInterval = (callback: callbackFCType, delay: number | null) => {
  const storedCallback = useRef<callbackFCType>();

  useEffect(() => {
    storedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const IntervalCallback = () => {
      storedCallback.current && storedCallback.current();
    };
    if (delay !== null) {
      const intervalId = setInterval(IntervalCallback, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

export default useInterval;
