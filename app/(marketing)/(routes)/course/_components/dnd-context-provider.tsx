"use client";

import CourseFileCard from "@/components/course-file-card";
import axios from "@/lib/instance";
import { CourseFileType } from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
const DndContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const [activeFile, setActiveFile] = useState<CourseFileType | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data?.current) {
      const file = event.active.data.current as CourseFileType;
      setActiveFile(file);
    }
  };

  const [loading, setLoading] = useState(false);
  const handleDragEnd = async (event: DragEndEvent) => {
    if (
      event.active.data?.current &&
      event.over &&
      event.over.id === "course-favorite-dropable"
    ) {
      const file = event.active.data.current as CourseFileType;
      if (file) {
        try {
          setLoading(true);
          await axios.post(
            "/content/addFavorites",
            {
              content: file,
            },
            {
              headers: {
                Authorization: data?.user?.accessToken,
              },
            }
          );
          toast.success("File added to favorites.");
          queryClient.refetchQueries({ queryKey: ["course_favorites"] });
        } catch (error: any) {
          toast.error(error.response?.data?.message);
          console.log("Error while dropping file.Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    }
    setActiveFile(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveFile(null)}
      modifiers={[restrictToWindowEdges]}
    >
      {children}
      {loading && (
        <div className="fixed bottom-0 right-0 flex items-center gap-x-2 bg-[var(--brand-color)] text-white p-4 rounded-md drop-shadow-lg text-sm font-semibold">
          <Loader2 className="animate-spin" />
          Adding to favorites...
        </div>
      )}

      <DragOverlay modifiers={[restrictToWindowEdges]} dropAnimation={null}>
        {activeFile ? <CourseFileCard file={activeFile} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DndContextProvider;
