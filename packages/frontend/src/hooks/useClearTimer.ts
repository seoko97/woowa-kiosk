import { useEffect, useState } from "react";

type IReturn = (cb: () => void, delay: number) => [number, () => void, () => void];

export const useClearTimer: IReturn = (cb, delay) => {
  const [time, setTime] = useState(delay / 1000);
  const [start, setStart] = useState(false);

  const startTimer = () => {
    setStart(true);
  };

  const stopTimer = () => {
    setStart(false);
  };

  useEffect(() => {
    if (!start) return;

    const _timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    const _delayCallBack = setTimeout(() => {
      cb();
    }, delay);

    return () => {
      clearInterval(_timer);
      clearTimeout(_delayCallBack);
    };
  }, [start]);

  return [time, startTimer, stopTimer];
};
