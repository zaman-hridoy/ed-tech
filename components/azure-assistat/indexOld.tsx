"use client";
import playMicAnimation from "@/public/lottie_files/play-mic.json";
import processingAnimation from "@/public/lottie_files/processing-voice.json";
import { usePorcupine } from "@picovoice/porcupine-react";
import { Mic, X } from "lucide-react";
import * as speechSdk from "microsoft-cognitiveservices-speech-sdk";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { playMicNextAudio, playMicOffAudio, playMicOnAudio } from "./sounds";
import { getTokenOrRefresh } from "./token-util";
import { useVoiceAssistant } from "./use-openai-socket";
// const speechSdk = require("microsoft-cognitiveservices-speech-sdk");
const LottieAnimation = dynamic(() => import("@/components/lottie-animation"), {
  ssr: false,
});

type PlayerType = {
  message: string;
  muted: boolean;
};

const porcupineKeyword = {
  publicPath: "hey-ethan.ppn",
  label: "Hey Ethun",
};

const porcupineModel = { publicPath: "porcupine_params.pv" };

const AzureAssistant = () => {
  const assistant = useVoiceAssistant();

  const pico = usePorcupine();
  const { keywordDetection, release } = pico;

  const [displayText, setDisplayText] = useState("");
  const [isAssistantRunning, setAssistantRunning] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognizerRef = useRef<speechSdk.SpeechRecognizer | null>(null);
  const synthesisRef = useRef<speechSdk.SpeechSynthesizer | null>(null);
  const audioRef = useRef<speechSdk.SpeakerAudioDestination | null>(null);

  useEffect(() => {
    pico.init(
      "s0k+EfTk3IhoIHvbqrYDB9nidUTqhSJywXDnzYRom26X6IcGCJFe0g==",
      porcupineKeyword,
      porcupineModel
    );
  }, [pico]);

  const handleStartPico = async () => {
    await pico.start();
    setAssistantRunning(true);
    setIsListening(true);
    setDisplayText(`Start by talking: "Hey Ethan"`);
    console.log("Listening for the wake word...");
  };

  const handleStopPico = async () => {
    await pico.stop();
    await release();
    closeAssistant();
    console.log("Stopped listening.");
  };

  const synthesizeSpeech = useCallback(
    (text: string) => {
      const speechConfig = speechSdk.SpeechConfig.fromSubscription(
        "b68cda92c8a64f4390e4d9ea38585e82",
        "eastus"
      );

      const player = new speechSdk.SpeakerAudioDestination();
      const audioConfig = speechSdk.AudioConfig.fromSpeakerOutput(player);
      const speechSynthesizer = new speechSdk.SpeechSynthesizer(
        speechConfig,
        audioConfig
      );
      synthesisRef.current = speechSynthesizer;
      audioRef.current = player;

      speechSynthesizer.speakTextAsync(
        text,
        (result) => {
          speechSynthesizer.close();
          return result.audioData;
        },
        (error) => {
          console.log(error);
          speechSynthesizer.close();
          setIsPlaying(false);
          console.log("Error playing");
        }
      );

      player.onAudioStart = () => {
        console.log("Start playing");
        setIsProcessing(false);
        setIsPlaying(true);
        setIsListening(false);
      };

      player.onAudioEnd = () => {
        console.log("finished playing");
        setIsPlaying(false);
        setIsListening(true);
        if (recognizerRef.current) {
          playMicNextAudio();
          setDisplayText("Speeck into your microphone...");
          recognizerRef.current.recognizeOnceAsync((result) => {
            console.log({ result });
            if (result.reason === speechSdk.ResultReason.RecognizedSpeech) {
              setDisplayText(result.text);
              assistant.socket?.send(
                JSON.stringify({
                  type: "chat",
                  message: result.text,
                })
              );
              setIsListening(false);
            } else {
              setDisplayText("");
              setIsListening(false);
              setAssistantRunning(false);
            }
          });
        }
      };

      speechSynthesizer.synthesisStarted = (s, e) => {
        console.log("Start playing event");
      };

      speechSynthesizer.SynthesisCanceled = (s, e) => {
        console.log("cancelled playing");
        // setIsPlaying(false);
        setIsListening(true);
      };
    },
    [assistant]
  );

  useEffect(() => {
    if (assistant.isConnected && assistant.socket) {
      assistant.socket.onmessage = (event) => {
        const result = JSON.parse(event.data);
        console.log({ result });
        if (result.type === "play") {
          synthesizeSpeech(result.text);
        } else if (result.type === "processing") {
          setIsProcessing(true);
        }
      };
    }
  }, [assistant, synthesizeSpeech]);

  const startAIAssistant = useCallback(async () => {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechSdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    // const speechConfig = speechSdk.SpeechConfig.fromSubscription(
    //   "b68cda92c8a64f4390e4d9ea38585e82",
    //   "eastus"
    // );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = speechSdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechSdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );
    recognizerRef.current = recognizer;
    setAssistantRunning(true);
    playMicOnAudio();
    setDisplayText("Speeck into your microphone...");

    setIsListening(true);
    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === speechSdk.ResultReason.RecognizedSpeech) {
        setDisplayText(result.text);
        assistant.socket?.send(
          JSON.stringify({
            type: "chat",
            message: result.text,
          })
        );
        setIsListening(false);
      } else {
        setDisplayText("");
        setIsListening(false);
        setAssistantRunning(false);
      }
    });
  }, [assistant.socket]);

  const closeAssistant = () => {
    if (!recognizerRef.current) return;
    // recognizerRef.current.close();
    if (synthesisRef.current) {
      // synthesisRef.current.close();
      synthesisRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.close();
      audioRef.current = null;
    }
    playMicOffAudio();
    recognizerRef.current = null;
    setIsListening(false);
    setIsPlaying(false);
    setAssistantRunning(false);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (keywordDetection !== null) {
      console.log("Keyword Detected:", keywordDetection.label);
      release();
      startAIAssistant();
    }
  }, [keywordDetection, release, startAIAssistant]);

  // console.log({ isAssistantRunning, isPlaying, isListening, isProcessing });

  return (
    <div className="fixed bottom-5 right-5">
      <div className="relative">
        {isAssistantRunning && (
          <div className="bg-white drop-shadow-xl p-3 rounded-full absolute bottom-4 right-16 border-0 text-right transition-all duration-1000">
            {isListening && !isPlaying && displayText && (
              <p className="text-sm text-slate-600 tracking-tight font-semibold max-w-xs direction-reverse whitespace-nowrap">
                {displayText}
              </p>
            )}
            {!isPlaying && !isListening && isProcessing && (
              <LottieAnimation
                style={{ width: 50, height: 50 }}
                animationData={processingAnimation}
                loop={true}
              />
            )}

            {isPlaying && !isListening && !isProcessing && (
              <LottieAnimation
                style={{ width: 50, height: 50 }}
                animationData={playMicAnimation}
                loop={true}
              />
            )}
          </div>
        )}

        {isAssistantRunning ? (
          <Button
            size="icon"
            className="w-14 h-14 p-2 hover:bg-[var(--brand-color-alert)] border-0 bg-[var(--brand-color-alert)] hover:scale-110 drop-shadow-2xl rounded-full transition-all absolute bottom-0 right-0"
            variant="ghost"
            onClick={handleStopPico}
          >
            <X className="w-8 h-8 text-white" />
          </Button>
        ) : (
          <Button
            size="icon"
            className="w-14 h-14 p-2 hover:bg-[var(--brand-color)] border-2 border-[var(--brand-color)] hover:scale-110 bg-[var(--brand-color)] drop-shadow-2xl rounded-full transition-all absolute bottom-0 right-0"
            variant="ghost"
            onClick={handleStartPico}
          >
            <Mic className="w-8 h-8 text-white" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AzureAssistant;
