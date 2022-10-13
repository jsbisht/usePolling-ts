import { useEffect } from "react";
import { usePolling } from "../hooks/usePolling";

export default function PollResult() {
  const [result, error, clearInterval] = usePolling(
    "http://localhost:3000/api/hello",
    (data: any) => data.result === "completed",
    1000
  );

  useEffect(() => {
    return () => {
      if (typeof clearInterval === "function") {
        clearInterval();
      }
    };
  }, [clearInterval]);

  if (error) {
    return <>Error occured while processing</>;
  }

  return (
    <>
      {result ? (
        <Completed />
      ) : (
        <UnderProcessing clearInterval={clearInterval} />
      )}
    </>
  );
}

function UnderProcessing({ clearInterval }: any) {
  return (
    <>
      <h3>Processing</h3>
      <button onClick={clearInterval}>Stop Polling</button>
    </>
  );
}

function Completed({ clearInterval }: any) {
  useEffect(() => {
    clearInterval();
  }, []);

  return <h3>Completed</h3>;
}
