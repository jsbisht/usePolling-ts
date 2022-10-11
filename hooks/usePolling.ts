import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import useInterval from "./useInterval";

type PollingError = {
  error: string;
} | null;

export function usePolling<T>(
  url: string,
  predicate: (data: AxiosResponse<T>) => boolean,
  pollingInterval: number | null
) {
  const [delay, setDelay] = useState(pollingInterval);
  const [result, setResult] = useState(null);
  const [error, setError] = useState<PollingError>(null);

  useInterval(async () => {
    try {
      const { data } = await axios.get(url);
      if (predicate(data)) {
        setResult(data);
        setDelay(null);
      }
    } catch (error) {
      setError({ error: "Error occured" });
      console.error(error);
    }
  }, delay);

  return [result, error];
}
