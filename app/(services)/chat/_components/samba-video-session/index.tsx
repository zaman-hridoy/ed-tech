"use client";

import DigitalSambaEmbedded from "@digitalsamba/embedded-sdk";
import { useEffect, useRef } from "react";

const SambaVideoSession = () => {
  const frameRef = useRef<any>();
  useEffect(() => {
    if (!frameRef.current) return;
    const sambaFrame = DigitalSambaEmbedded.createControl({
      url: "https://simplitaught.digitalsamba.com/7YVfpLGjpbnFHy6wR487ys",
      room: "fWYaNZTtongKC76hRqKqHw",
      frame: frameRef.current,
    });
    sambaFrame.load();
  }, []);
  return (
    <div className="h-full" ref={frameRef}>
      {/* <iframe ref={frameRef} allow="true"></iframe> */}
    </div>
  );
};

export default SambaVideoSession;
