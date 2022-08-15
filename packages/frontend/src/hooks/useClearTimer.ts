import { useEffect, useState } from "react";

type IFn = () => void;
type IReturn = (cb: () => void, delay: number, values?: any[]) => [number, IFn, IFn, IFn];

export const useClearTimer: IReturn = (cb, delay, values = []) => {
  const [time, setTime] = useState(delay / 1000);
  const [start, setStart] = useState(false);

  const startTimer = () => {
    setStart(true);
  };

  const stopTimer = () => {
    setStart(false);
  };

  const setClearTime = () => {
    setTime(delay / 1000);
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
  }, [start, cb, delay, ...values]);

  return [time, startTimer, stopTimer, setClearTime];
};
