"use client";

import { getYoutubeThumbnail } from "@/lib/helper-methods";
import { Annotation } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  file: Annotation;
}

const VideoPreview = ({ file }: Props) => {
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    const previewUrl = getYoutubeThumbnail(file.videoUrl);
    setThumbnail(previewUrl);
  }, [file]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {thumbnail ? (
        <Image
          src={thumbnail}
          fill
          className="object-cover"
          alt={"annotated video"}
          blurDataURL={
            "data:image/jpeg;base64,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"
          }
          placeholder="blur"
          sizes="100%"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="60px"
            height="60px"
          >
            <path
              fill="#FF0000"
              d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
            />
            <path fill="#FFF" d="M20 31L20 17 32 24z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;
