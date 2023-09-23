import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const oldCallBack = useRef(callback);
  useEffect(() => {
    oldCallBack.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    const intervalId = setInterval(() => oldCallBack.current(), delay);
    return () => {
      clearInterval(intervalId);
    };
  }, [delay]);
};
