"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AssistantContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
  receivedData: any;
  isProcessing: boolean;
  isPlaying: boolean;
};

const AssistantContext = createContext<AssistantContextType>({
  socket: null,
  isConnected: false,
  receivedData: null,
  isProcessing: false,
  isPlaying: false,
});

export const useVoiceAssistant = () => {
  return useContext(AssistantContext);
};

export const VoiceAssistantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [receivedData, setSocketData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const socketUrl = "ws://localhost:8000";
    const socketInstance = new WebSocket(socketUrl);
    socketInstance.onopen = (e) => {
      console.log(`WS:Connection established`);
      setSocket(socketInstance);
      setIsConnected(true);
      //   const payload = {
      //     type: "initial_setup",
      //     data: "welcome to assistant",
      //   };
      //   socketInstance.send(JSON.stringify(payload));
    };

    // socketInstance.onmessage = async (event) => {
    // //   console.log({ event });
    //   //   if (typeof event.data === "string") {
    //   //     setIsProcessing(true);
    //   //   } else {
    //   //     setIsProcessing(false);
    //   //     setIsPlaying(true);
    //   //     const audioUrl = URL.createObjectURL(event.data);
    //   //     const audioEl = new Audio(audioUrl);
    //   //     audioEl.loop = false;
    //   //     audioEl.play();
    //   //     audioEl.onended = () => {
    //   //       setIsPlaying(false);
    //   //       playMicNextAudio();
    //   //     };
    //   //   }
    //   // const parsedData = JSON.parse(event.data);
    //   // setSocketData(parsedData);
    // };

    socketInstance.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log("[close] Connection died");
      }
    };

    socketInstance.onerror = (error) => {
      console.log("[WS]: ", error);
      console.log("[WS]: Finish testing - ERROR");
      setIsConnected(false);
      setSocketData(null);
    };
  }, []);

  return (
    <AssistantContext.Provider
      value={{ socket, isConnected, receivedData, isProcessing, isPlaying }}
    >
      {children}
    </AssistantContext.Provider>
  );
};
