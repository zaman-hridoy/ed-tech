// "use client";
// import { useCheetah } from "@picovoice/cheetah-react";
// import { Loader2 } from "lucide-react";
// import { useEffect } from "react";
// import { Button } from "../ui/button";
// import { bot_smiling } from "./icons";

// const VoiceWidgetOld = () => {
//   const { result, isLoaded, isListening, error, init, start, stop, release } =
//     useCheetah();

//   useEffect(() => {
//     init(process.env.PICO_ACCESS_KEY!, { publicPath: "cheetah_params.pv" });
//   }, [init]);

//   useEffect(() => {
//     if (result !== null) {
//       // ... use transcript result
//       console.log(result.transcript);
//     }
//   }, [result]);

//   const handleStart = async () => {
//     await start();
//   };

//   const handleStop = async () => {
//     await stop();
//   };

//   // console.log({ isListening, error, result, isLoaded });

//   if (isListening) {
//     return (
//       <Button
//         size="icon"
//         className="fixed bottom-5 right-5 p-0 hover:bg-white border-2 border-[var(--brand-color)] w-16 h-16 hover:scale-110 bg-white drop-shadow-2xl rounded-full"
//         variant="ghost"
//         onClick={handleStop}
//       >
//         <Loader2 className="animate-spin" />
//       </Button>
//     );
//   }

//   return (
//     <Button
//       size="icon"
//       className="fixed bottom-5 right-5 p-0 hover:bg-white border-2 border-[var(--brand-color)] w-16 h-auto hover:scale-110 bg-white drop-shadow-2xl rounded-full"
//       variant="ghost"
//       onClick={handleStart}
//     >
//       {bot_smiling}
//     </Button>
//   );
// };

// export default VoiceWidgetOld;
