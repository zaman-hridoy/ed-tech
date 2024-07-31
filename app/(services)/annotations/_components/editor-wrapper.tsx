"use client";

import { Annotation, Profile } from "@prisma/client";
import { Fragment, useRef } from "react";
import AnnotationActions from "./annotation-actions";
import AnnotationList from "./annotation-list";
import ControllerArea from "./controller-area";

interface Props {
  annotation: Annotation & {
    profile: Profile;
  };
  mode: "edit" | "preview";
}

const EditorWrapper = ({ annotation, mode }: Props) => {
  const playerRef = useRef<any>(null);
  const handleSeekTo = (played: number) => {
    playerRef?.current?.seekTo(played, "seconds");
  };

  return (
    <Fragment>
      {/* sidebar */}
      <div className="fixed top-0 right-0 lg:w-[450px] bg-white h-full hidden lg:flex flex-col border-l">
        <div className="border-b">
          <AnnotationActions annotation={annotation} mode={mode} />
        </div>
        <AnnotationList
          annotationId={annotation.id}
          handleSeekTo={handleSeekTo}
          mode={mode}
        />
      </div>

      {/* navbar */}
      <div className="fixed top-0 left-0 w-full bg-white border-b lg:hidden">
        <div className="border-b">
          <AnnotationActions annotation={annotation} mode={mode} />
        </div>
      </div>
      <ControllerArea
        url={annotation.videoUrl}
        provider={annotation.provider}
        annotationId={annotation.id}
        ref={playerRef}
        handleSeekTo={handleSeekTo}
        mode={mode}
      />

      <div className="lg:hidden bg-white">
        <AnnotationList
          annotationId={annotation.id}
          handleSeekTo={handleSeekTo}
          mode={mode}
        />
      </div>
    </Fragment>
  );
};

export default EditorWrapper;
