import { usePolling } from "../hooks/usePolling";

export default function PollResult() {
  const [result, error] = usePolling(
    "http://localhost:3000/api/hello",
    (data: any) => data.result === "completed",
    1000
  );

  if (error) {
    return <>Error occured while processing</>;
  }

  return <>{result ? "Completed" : "Processing"}</>;
}
