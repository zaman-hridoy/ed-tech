"use client";

import { Annotation } from "@prisma/client";
import Link from "next/link";
import VideoPreview from "./video-preview";

interface Props {
  file: Annotation;
}

const AnnotationContent = ({ file }: Props) => {
  return (
    <Link href={`/annotations/editor?annotationId=${file.id}`}>
      <div className="w-full flex flex-col gap-y-2 rounded-md overflow-hidden cursor-pointer">
        <div className="w-full aspect-video border bg-zinc-50 relative rounded-xl overflow-hidden hover:rounded-none transition-all duration-300">
          {file.provider === "YOUTUBE" && <VideoPreview file={file} />}
        </div>
      </div>
    </Link>
  );
};

export default AnnotationContent;
