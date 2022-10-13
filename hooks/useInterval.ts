import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [clearIntervalFn, setClearIntervalFn] = useState<() => void>();
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    setIntervalId(id);
    setClearIntervalFn(() => clearInterval(intervalId));

    return clearIntervalFn;
  }, [delay]);

  return [clearIntervalFn];
}
