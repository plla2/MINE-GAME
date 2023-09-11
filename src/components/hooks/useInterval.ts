import { useEffect, useRef } from 'react';

type callbackFCType = () => void;

// 이 커스텀 훅은 callback, delay라는 2개의 매개변수를 받는다.
// callback은 delay마다 호출된다.
const useInterval = (callback: callbackFCType, delay: number | null) => {
  // storedCallback은 useRef 훅을 사용하여 현재의 callback이 저장되어있는 변수다.
  const storedCallback = useRef<callbackFCType>();

  // callback이 변경될 때마다 storedCallback.current에 저장이 된다.
  useEffect(() => {
    storedCallback.current = callback;
  }, [callback]);

  // delay가 변경될 때마다 호출된다.
  // IntervalCallback함수는 현재 저장되어 있는 콜백함수를 호출한다.
  // delay가 null이 아닐 때 delay시간 간격마다 IntervalCallback함수를 호출한다.
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
