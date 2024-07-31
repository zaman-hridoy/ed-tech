import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { NextRequest } from "next/server";
import { PassThrough } from "stream";

export async function GET(req: NextRequest) {
  const text =
    req.nextUrl.searchParams.get("text") ||
    "Hi! I am ethan. How can I help you?";
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "4695b361f3c54b2ca9f5d71a758ac3ac",
    "eastus"
  );

  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);
  const visemes: any[] = [];

  speechSynthesizer.visemeReceived = function (sender, event) {
    console.log(
      "(Viseme), Audio Offset: " +
        event.audioOffset / 10000 +
        "ms. Viseme ID: " +
        event.visemeId
    );

    visemes.push([event.audioOffset / 10000, event.visemeId]);
  };

  const audioStream: any = await new Promise((resolve, reject) => {
    speechSynthesizer.speakTextAsync(
      text,
      (result) => {
        const { audioData } = result;
        speechSynthesizer.close();

        // convert arraybuffer to stream
        const bufferStream = new PassThrough();
        bufferStream.end(Buffer.from(audioData));
        resolve(bufferStream);
      },
      (error) => {
        speechSynthesizer.close();
        reject(error);
      }
    );
  });

  const response = new Response(audioStream, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": "inline; filename=tts.mp3",
      Visemes: JSON.stringify(visemes),
    },
  });

  return response;
}
