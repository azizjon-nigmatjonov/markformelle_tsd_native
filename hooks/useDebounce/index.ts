import { useCallback, useRef } from "react";

const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 300
) => {
  const timer = useRef<NodeJS.Timeout | null>(null); // Specify the type of timer

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [delay, callback]
  );

  // Cleanup function to clear the timer on unmount
  const cleanup = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  return {
    debouncedCallback,
    cleanup,
  };
};

export default useDebounce;
