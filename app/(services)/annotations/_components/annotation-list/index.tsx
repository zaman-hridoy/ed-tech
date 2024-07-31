"use client";

import EmptySection from "@/components/empty-section";
import { AnnotationNote, Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, ServerCrash } from "lucide-react";
import NoteItem from "./note-item";

type AnnotationNoteType = AnnotationNote & {
  profile: Profile;
};

interface Props {
  annotationId: number;
  handleSeekTo: (time: number) => void;
  mode: "edit" | "preview";
}

const AnnotationList = ({ annotationId, handleSeekTo, mode }: Props) => {
  const fetchData = async () => {
    return axios
      .get(`/api/annotations?annotationId=${annotationId}`)
      .then((res) => res.data);
  };
  const { data, status } = useQuery({
    queryKey: ["annotation-notes"],
    queryFn: fetchData,
  });

  if (status === "pending") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ServerCrash />
        <p>Something went wroong!</p>
      </div>
    );
  }

  const notes: AnnotationNoteType[] = data || [];

  if (notes.length === 0) {
    return (
      <div>
        <EmptySection emptyText="You don't have any annotations yet." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-1 h-full overflow-y-auto no-scrollbar">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          handleSeekTo={handleSeekTo}
          mode={mode}
        />
      ))}
    </div>
  );
};

export default AnnotationList;
