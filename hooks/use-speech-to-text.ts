"use client";

import { useSpeechRecognition } from "react-speech-recognition";

type MessageType = {
  text: string;
  isFinal: boolean;
};

interface Props {
  enabled: boolean;
  muted: boolean;
  showMessage: (message: MessageType) => void;
}

const AUDIO_SAMPLE_RATE = 40_000;

export const useSpeechToText = ({ enabled, muted, showMessage }: Props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return;
  }
};
