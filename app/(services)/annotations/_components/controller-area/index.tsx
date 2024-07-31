"use client";

import ActionTooltip from "@/components/action-tooltip";
import UserAvatar from "@/components/user-avatar";
import { AnnotationNote, Profile, VideoProvider } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import AnnotationForm from "../annotation-form";

type AnnotationNoteType = AnnotationNote & {
  profile: Profile;
};

const calculatePosition = (note: AnnotationNote) => {
  const distance = (note.played / note.duration) * 100 + "%";
  return distance;
};

interface Props {
  url: string;
  provider: VideoProvider;
  annotationId: number;
  handleSeekTo: (time: number) => void;
  mode: "edit" | "preview";
}

const ControllerArea = React.forwardRef(
  (
    { url, annotationId, handleSeekTo, mode }: Props,
    ref: React.LegacyRef<ReactPlayer> | undefined
  ) => {
    const queryClient = useQueryClient();
    const [isMounted, setIsMounted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 />
        </div>
      );
    }

    const notes: AnnotationNoteType[] =
      queryClient.getQueryData(["annotation-notes"]) || [];

    return (
      <Fragment>
        <div className="bg-black text-white flex items-center justify-center lg:h-full">
          <div className="w-full h-full pt-[50px] aspect-video lg:aspect-auto">
            <ReactPlayer
              ref={ref}
              width={"100%"}
              height={"100%"}
              url={url}
              playing={playing}
              onReady={() => setPlaying(true)}
              controls
              onProgress={(state) => {
                setPlayed(state.playedSeconds);
              }}
              onDuration={(duration) => setDuration(duration)}
            />
          </div>
        </div>
        <div>
          <div className="w-full h-10 bg-[var(--brand-color)] px-4">
            <div className="h-full w-full relative">
              {notes.map((note) => (
                <ActionTooltip
                  label={`${note.title} by ${note.profile.name}`}
                  side="top"
                  key={note.id}
                >
                  <span
                    className={`absolute top-1 -ml-4`}
                    style={{
                      left: calculatePosition(note),
                    }}
                    onClick={() => handleSeekTo(note.played)}
                  >
                    <UserAvatar src={note.profile.imageUrl} />
                  </span>
                </ActionTooltip>
              ))}
            </div>
          </div>
          {mode === "edit" && (
            <AnnotationForm
              played={played}
              duration={duration}
              annotationId={annotationId}
            />
          )}
        </div>
      </Fragment>
    );
  }
);

ControllerArea.displayName = "ControllerArea";
export default ControllerArea;
