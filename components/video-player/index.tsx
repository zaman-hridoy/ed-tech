"use client";

import { getYoutubeVideoID } from "@/lib/helper-methods";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import ReactPlayer from "react-player";

interface Props {
  src: string;
}

const VideoPlayer = ({ src }: Props) => {
  const ytVideoId = getYoutubeVideoID(src);

  if (ytVideoId) {
    return (
      <div className="aspect-video">
        <ReactPlayer width={"100%"} height={"100%"} url={src} controls />
      </div>
    );
  }

  return (
    <div className="aspect-video">
      <Plyr
        source={{
          type: "video",
          sources: [
            {
              src,
              type: "video/mp4",
              size: 720,
            },
          ],
        }}
        controls
        poster={src}
      />
    </div>
  );
};

export default VideoPlayer;
