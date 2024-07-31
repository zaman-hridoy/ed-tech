// "use client";
// import axios from "@/lib/instance";
// import groovyWalkAnimation from "@/public/lottie/siri.json";
// // import { useCheetah } from "@picovoice/cheetah-react";
// import Lottie from "lottie-react";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import ReactHowler from "react-howler";
// import { BiMicrophone } from "react-icons/bi";
// import { Button } from "../ui/button";

// const VoiceWidgetOld = () => {
//   // const { result, isLoaded, isListening, error, init, start, stop, release } =
//   //   useCheetah();

//   // useEffect(() => {
//   //   init(process.env.PICO_ACCESS_KEY!, { publicPath: "cheetah_params.pv" });
//   // }, [init]);

//   const [text, setText] = useState("");
//   const [callingApi, setCallingApi] = useState(false);
//   const [openSound, setOpenSound] = useState(false);
//   const [closeSound, setCloseSound] = useState(false);

//   useEffect(() => {
//     if (result?.transcript) {
//       setText(result.transcript);
//     }

//     const synth = window.speechSynthesis;
//     const voices = synth.getVoices();
//     const googleVoice = voices.find(
//       (v) => v.name === "Google UK English Female"
//     );

//     if (result && result.transcript) {
//       // ... use transcript result

//       const finalText = result.transcript;
//       (async () => {
//         try {
//           console.log("calling....");
//           setCallingApi(true);
//           const res = await axios.post("/profile/check-function-call", {
//             userInput: finalText,
//           });
//           console.log(res.data);
//           const content: string = res.data?.data?.content || "";
//           if (content) {
//             await stop();
//             let speech = new SpeechSynthesisUtterance(content);
//             if (googleVoice) {
//               speech.voice = googleVoice;
//             }
//             synth.speak(speech);
//           }
//         } catch (error) {
//           console.log(error);
//           toast.error("Something went wrong.");
//         } finally {
//           setCallingApi(false);
//           setText("");
//         }
//       })();

//       return () => {
//         synth.cancel();
//       };
//     }
//   }, [result, stop]);

//   const handleStart = async () => {
//     await start();
//     setCloseSound(false);
//     setOpenSound(true);
//     setTimeout(() => {
//       setOpenSound(false);
//     }, 1000);
//   };

//   const handleStop = async () => {
//     await stop();
//     setText("");
//     setOpenSound(false);
//     setCloseSound(true);
//     setTimeout(() => {
//       setCloseSound(false);
//     }, 1000);
//   };

//   return (
//     <div className="fixed bottom-5 right-5 ">
//       <div>
//         {openSound && (
//           <ReactHowler src="/sounds/bot-on.wav" playing={openSound} />
//         )}
//         {closeSound && (
//           <ReactHowler src="/sounds/bot-off.wav" playing={closeSound} />
//         )}
//       </div>
//       <div className="relative">
//         {text && isListening && (
//           <div className="bg-white drop-shadow-xl p-3 rounded-full absolute bottom-0 right-0 border border-[var(--brand-color)] text-right pr-16 h-full w-max flex flex-col items-center justify-center transition-all duration-1000">
//             <p className="text-sm text-slate-600 tracking-tight font-semibold min-w-[150px]">
//               {text}
//             </p>
//           </div>
//         )}

//         {!isListening ? (
//           <Button
//             size="icon"
//             className="w-auto h-auto p-2 hover:bg-[var(--brand-color)] border-2 border-[var(--brand-color)] hover:scale-110 bg-[var(--brand-color)] drop-shadow-2xl rounded-full transition-all"
//             variant="ghost"
//             onClick={handleStart}
//             disabled={callingApi}
//           >
//             <BiMicrophone className="w-8 h-8 text-white" />
//           </Button>
//         ) : (
//           <Button
//             size="icon"
//             className="w-[55px] h-auto p-0 hover:bg-white border-2 ring-0 ring-offset-0 border-[var(--brand-color)] bg-white drop-shadow-2xl rounded-full flex items-center justify-center"
//             variant="ghost"
//             onClick={handleStop}
//           >
//             <Lottie
//               animationData={groovyWalkAnimation}
//               loop={true}
//               style={{ width: "100%" }}
//             />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VoiceWidgetOld;
