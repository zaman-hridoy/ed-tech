"use client";
import { usePorcupine } from "@picovoice/porcupine-react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mic, X } from "lucide-react";
import * as speechSdk from "microsoft-cognitiveservices-speech-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { playMicNextAudio, playMicOffAudio, playMicOnAudio } from "./sounds";

const speechConfig = speechSdk.SpeechConfig.fromSubscription(
  "4695b361f3c54b2ca9f5d71a758ac3ac",
  "eastus"
);

const porcupineKeyword = {
  publicPath: "hey-ethan.ppn",
  label: "Hey Ethun",
};

const porcupineModel = { publicPath: "porcupine_params.pv" };

type AIActionState = "LISTENING" | "PLAYING" | "LOADING" | "IDLE";

const AzureAssistant = () => {
  const pico = usePorcupine();
  const router = useRouter();
  const { keywordDetection, release, isLoaded, isListening } = pico;
  const canvasEle = useRef<HTMLCanvasElement | null>(null);
  const recognizer = useRef<speechSdk.SpeechRecognizer | null>(null);
  const [recognizedText, setRecongnizedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [AIState, setAIState] = useState<AIActionState>("IDLE");

  const startAI = async () => {
    // await startPico();
    setAIState("IDLE");
    setIsStarted(true);

    playMicOnAudio();
    recognizer.current?.startContinuousRecognitionAsync();
    setAIState("LISTENING");
    userListeningAnimation();

    console.log("AI Started");
  };

  useEffect(() => {
    userListeningAnimation();
  }, []);

  useEffect(() => {
    pico.init(
      "s0k+EfTk3IhoIHvbqrYDB9nidUTqhSJywXDnzYRom26X6IcGCJFe0g==",
      porcupineKeyword,
      porcupineModel
    );
  }, [pico]);

  const startPico = async () => {
    await pico.start();
    setIsStarted(true);
    playMicOnAudio();
    console.log("Listening for the wake word...");
  };

  const stopPico = async () => {
    await pico.stop();
    await pico.release();
    setIsStarted(false);
    console.log("Stopping pico...");
  };

  const startListening = () => {
    recognizer.current?.startContinuousRecognitionAsync();
    setAIState("LISTENING");
    userListeningAnimation();
    playMicNextAudio();
  };

  const stopListening = () => {
    recognizer.current?.stopContinuousRecognitionAsync();
    setAIState("LOADING");
    processingAnimation();
  };

  const stopAI = async () => {
    await stopPico();
    recognizer.current?.stopContinuousRecognitionAsync();
    setRecongnizedText("");
    playMicOffAudio();
    setAIState("IDLE");
    setIsStarted(false);
    console.log("AI Stopped");
  };

  useEffect(() => {
    console.log({ keywordDetection });
    if (keywordDetection !== null) {
      console.log("Keyword Detected:", keywordDetection.label);
      release();

      startListening();

      // recognizer.current?.startContinuousRecognitionAsync();
      // setAIState("LISTENING");
      // userListeningAnimation();
    }
  }, [keywordDetection, release]);

  const userListeningAnimation = () => {
    const canvas = canvasEle.current!;
    const ctx = canvas.getContext("2d")!;

    let radius = 50;
    let increasing = true;
    const maxRadius = 50;
    const minRadius = 45;
    const speed = 0.1; // Adjust the speed of the animation

    function drawCircle() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();

      if (increasing) {
        radius += speed;
        if (radius >= maxRadius) {
          increasing = false;
        }
      } else {
        radius -= speed;
        if (radius <= minRadius) {
          increasing = true;
        }
      }

      requestAnimationFrame(drawCircle);
    }

    drawCircle();
  };

  const processingAnimation = () => {
    const canvas = canvasEle.current!;
    const ctx = canvas.getContext("2d")!;
    // Animation properties
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 40;
    const lineWidth = 8;
    const segments = 12;
    const speed = 0.1;
    let angleOffset = 0;

    // Function to draw the spinner
    function drawSpinner() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      for (let i = 0; i < segments; i++) {
        const angle = (i * 2 * Math.PI) / segments + angleOffset;
        const opacity = 1 - i / segments;

        ctx.beginPath();
        ctx.arc(
          centerX,
          centerY,
          radius,
          angle,
          angle + (2 * Math.PI) / segments
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    }

    // Animation loop
    function animate() {
      angleOffset += speed;
      drawSpinner();
      requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
  };

  const playAudioVoice = async (text: string) => {
    try {
      setRecongnizedText("");
      // getTTS
      const audioRes = await axios.get(`/api/tts?text=${text}`, {
        responseType: "blob",
      });

      const audioData = await audioRes.data;
      const audioUrl = URL.createObjectURL(audioData);

      //====
      const audio = document.createElement("audio");
      const ctx = canvasEle.current?.getContext("2d")!;
      audio.src = audioUrl;
      const audioContext = new AudioContext();
      audio.play();

      const audio_source = audioContext.createMediaElementSource(audio);
      const analyser = audioContext.createAnalyser();
      audio_source.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 32;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        const canvas = canvasEle.current!;
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        const centerX = WIDTH / 2;
        const centerY = HEIGHT / 2;
        const radius = Math.min(WIDTH, HEIGHT) / 6;

        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (Math.PI * 2) / bufferLength;

        for (let i = 0; i < bufferLength; i++) {
          const angle = barWidth * i;
          const barHeight = dataArray[i] * 0.5;

          const x = centerX + Math.cos(angle) * (radius + barHeight / 4);
          const y = centerY + Math.sin(angle) * (radius + barHeight / 4);

          ctx.beginPath();
          ctx.arc(x, y, barHeight / 4, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.closePath();
        }
      };

      draw();

      audio.addEventListener("playing", () => {
        console.log("started playing...");
      });

      audio.addEventListener("ended", () => {
        console.log("audio ened");

        startListening();
      });
    } catch (error) {
      console.log("Error on playing...");
    }
  };

  // const generateSynthesizer = (text: string) => {
  //   const speechSynthesizer = new speechSdk.SpeechSynthesizer(speechConfig);
  //   speechSynthesizer.speakTextAsync(
  //     text,
  //     (result) => {
  //       const { audioData } = result;
  //       speechSynthesizer.close();

  //       //convert arraybuffer to stream
  //       // Convert ArrayBuffer to binary string
  //       const binaryString = String.fromCharCode.apply(
  //         null,
  //         new Uint8Array(audioData)
  //       );

  //       // Convert binary string to Base64
  //       const base64 = btoa(binaryString);
  //       console.log({ base64 });
  //       playAudioVoice(base64);
  //     },
  //     (err) => {
  //       speechSynthesizer.close();
  //       console.log("Error in generate synthesis", err);
  //     }
  //   );
  // };

  const generateAIResponse = (text: string) => {
    stopListening();
    axios
      .post("https://stagingapi.simplitaught.com/profile/ai-chat/response", {
        user_id: 4233,
        user_message: text,
      })
      .then((res) => {
        const result = res.data.data;
        if (result.content) {
          // play ai voice with resposne
          playAudioVoice(result.content);
        } else if (result.function === "goto") {
          switch (result.arguments.route_name) {
            case "home":
              playAudioVoice(`Here is the ${result.arguments.route_name} page`);
              router.push("/");
              break;
            case "books":
              playAudioVoice(`Here is the ${result.arguments.route_name} page`);
              router.push("/text-books");
              break;
          }
        } else {
          // play ai voice with no matching found
          playAudioVoice("Sorry! I can't understand.");
        }
      })
      .catch((err) => {
        console.log(err);
        // play ai voice with no matching found
        playAudioVoice("Sorry! I can't understand.");
      });
  };

  // const startAIAssistant = () => {
  //   const audioConfig = speechSdk.AudioConfig.fromDefaultMicrophoneInput();
  //   const speechRecognizer = new speechSdk.SpeechRecognizer(
  //     speechConfig,
  //     audioConfig
  //   );
  //   recognizer.current = speechRecognizer;

  //   speechRecognizer.recognizing = (sender, event) => {
  //     console.log(`RECOGNIZING: TEXT=${event.result.text}`);
  //     setRecongnizedText(event.result.text);
  //   };

  //   speechRecognizer.recognized = (sender, event) => {
  //     if (event.result.reason === speechSdk.ResultReason.RecognizedSpeech) {
  //       console.log(`RECOGNIZED: TEXT=${event.result.text}`);
  //       generateAIResponse(event.result.text);
  //     } else if (event.result.reason === speechSdk.ResultReason.NoMatch) {
  //       console.log("NO MATCH: Speech could not be recognized.");
  //     }
  //   };

  //   speechRecognizer.canceled = (sender, event) => {
  //     console.log(`CANCELLED: Reason=${event.reason}`);

  //     if (event.reason == speechSdk.CancellationReason.Error) {
  //       console.log(`"CANCELED: ErrorCode=${event.errorCode}`);
  //       console.log(`"CANCELED: ErrorDetails=${event.errorDetails}`);
  //       console.log(
  //         "CANCELED: Did you set the speech resource key and region values?"
  //       );
  //     }

  //     speechRecognizer.stopContinuousRecognitionAsync();
  //   };
  // };

  useEffect(() => {
    const audioConfig = speechSdk.AudioConfig.fromDefaultMicrophoneInput();
    const speechRecognizer = new speechSdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );
    recognizer.current = speechRecognizer;

    speechRecognizer.recognizing = (sender, event) => {
      console.log(`RECOGNIZING: TEXT=${event.result.text}`);
      setRecongnizedText(event.result.text);
    };

    speechRecognizer.recognized = (sender, event) => {
      if (event.result.reason === speechSdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: TEXT=${event.result.text}`);
        generateAIResponse(event.result.text);
      } else if (event.result.reason === speechSdk.ResultReason.NoMatch) {
        console.log("NO MATCH: Speech could not be recognized.");
      }
    };

    speechRecognizer.canceled = (sender, event) => {
      console.log(`CANCELLED: Reason=${event.reason}`);

      if (event.reason == speechSdk.CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${event.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${event.errorDetails}`);
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        );
      }

      speechRecognizer.stopContinuousRecognitionAsync();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      <motion.div
        className="bg-black h-full w-full flex flex-col items-center justify-between rounded-xl overflow-hidden"
        // onClick={playAudioVoice}
        initial={{ opacity: 0, width: 0, height: 0 }}
        animate={{
          opacity: isStarted ? 1 : 0,
          width: isStarted ? 250 : 0,
          height: isStarted ? 400 : 0,
        }}
        layoutId="mic"
      >
        {/* <motion.div
          className="bg-white w-[100px] h-[100px] rounded-full shadow-sm shadow-black"
          initial={{
            scale: 1,
          }}
          animate={{
            scale: 1.05,
            transition: {
              duration: 1,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          hidden
        />

        <div className="flex items-center gap-x-2">
          {[24, 30, 25, 40].map((h, idx) => (
            <motion.div
              key={idx}
              className="w-5 h-10 rounded-full bg-white"
              initial={{
                height: 20,
              }}
              animate={{
                height: h,
              }}
              transition={{
                duration: 0.1,
              }}
            />
          ))}
        </div> */}

        <div className="flex items-center justify-center flex-col flex-1">
          {AIState === "IDLE" && (
            <p className="text-sm text-white font-semibold tracking-tight px-4 text-center">
              {`I'am Ethan. You can start by talking "Hey, Ethan."`}
            </p>
          )}
          <canvas
            ref={canvasEle}
            hidden={!isStarted}
            style={{ width: "100%", height: "120px" }}
          />

          <p className="text-xs text-white font-semibold tracking-tight px-4 text-center">
            {recognizedText}
          </p>
        </div>

        <div className="flex items-center justify-center w-full p-4">
          <Button
            size="icon"
            className="w-10 h-10 p-2 hover:bg-[var(--brand-color-alert)] border-0 bg-[var(--brand-color-alert)] hover:scale-110 drop-shadow-2xl rounded-full transition-all"
            variant="ghost"
            onClick={stopAI}
          >
            <X className="w-8 h-8 text-white" />
          </Button>
        </div>
      </motion.div>
      {/* {isStarted && (
        <div className="flex items-center justify-center w-[300px]">
          <Button
            size="icon"
            className="w-14 h-14 p-2 hover:bg-[var(--brand-color-alert)] border-0 bg-[var(--brand-color-alert)] hover:scale-110 drop-shadow-2xl rounded-full transition-all absolute bottom-0 right-0"
            variant="ghost"
            onClick={stopListening}
          >
            <X className="w-8 h-8 text-white" />
          </Button>
        </div>
      )} */}
      {!isStarted && (
        <motion.span layoutId="mic">
          <Button
            size="icon"
            className="w-14 h-14 p-2 hover:bg-[var(--brand-color)] border-2 border-[var(--brand-color)] hover:scale-110 bg-[var(--brand-color)] drop-shadow-2xl rounded-full transition-all absolute bottom-0 right-0"
            variant="ghost"
            onClick={startPico}
          >
            <Mic className="w-8 h-8 text-white" />
          </Button>
        </motion.span>
      )}
    </div>
  );
};

export default AzureAssistant;
