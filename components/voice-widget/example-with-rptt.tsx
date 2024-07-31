// "use client";
// import { Button } from "@/components/ui/button";
// import axios from "@/lib/instance";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// type MessageType = {
//   text: string;
//   isFinal: boolean;
// };

// const VoiceWidget = () => {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//     finalTranscript,
//   } = useSpeechRecognition();

//   console.log({ transcript, finalTranscript });
//   const [isTalking, setIsTalking] = useState(false);
//   const [finalText, setFinalText] = useState("");
//   const [callingApi, setCallingApi] = useState(false);

//   useEffect(() => {
//     if (isTalking || !finalText) return;
//     (async () => {
//       try {
//         console.log("calling....");
//         setCallingApi(true);
//         const res = await axios.post("/profile/check-function-call", {
//           userInput: finalText,
//         });
//         const content = res.data?.content;
//         if (content) {
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error("Something went wrong.");
//       } finally {
//         setCallingApi(false);
//       }
//     })();
//   }, [finalText, isTalking]);

//   useEffect(() => {
//     if (!isTalking && finalTranscript) {
//       setFinalText(finalTranscript);
//     }
//   }, [isTalking, finalTranscript]);

//   useEffect(() => {
//     if (!listening) {
//       setIsTalking(false);
//     }
//   }, [listening]);

//   if (!browserSupportsSpeechRecognition) {
//     return null;
//   }

//   return (
//     <div className="fixed bottom-5 right-5 ">
//       <Button
//         size="icon"
//         className="w-auto h-auto p-2 hover:bg-white border-2 border-[var(--brand-color)] hover:scale-110 bg-white drop-shadow-2xl rounded-full"
//         variant="ghost"
//         onClick={async () => {
//           await SpeechRecognition.startListening();
//           setIsTalking(true);
//         }}
//         disabled={callingApi}
//       >
//         {!listening ? (
//           <BiMicrophoneOff className="w-12 h-12 text-[var(--brand-color)]" />
//         ) : (
//           <BiMicrophone className="w-12 h-12 text-[var(--brand-color)] animate-pulse" />
//         )}
//       </Button>
//     </div>
//   );
// };

// export default VoiceWidget;
