"use client";

import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface Props {
  src: string;
}

const AudioPlayer = ({ src }: Props) => {
  return (
    <div className="flex items-center justify-center h-full">
      <Plyr
        source={{
          type: "audio",
          title: "Example title",
          sources: [
            {
              src,
              type: "audio/mp3",
            },
          ],
        }}
        // poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      />
    </div>
  );
};

export default AudioPlayer;
