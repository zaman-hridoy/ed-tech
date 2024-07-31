"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-20 min-h-[70vh]">
      <h2>Something went wrong!</h2>
      <code>{JSON.stringify(error)}</code>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
