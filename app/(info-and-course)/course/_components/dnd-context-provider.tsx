"use client";

import CourseFileCard from "@/components/course-file-card";
import { useCourseStore } from "@/hooks/use-course-store";
import { CourseFileType } from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useState } from "react";
const DndContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleAddFileToChapter } = useCourseStore();
  const [activeFile, setActiveFile] = useState<CourseFileType | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data?.current) {
      const file = event.active.data.current as CourseFileType;
      setActiveFile(file);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (
      event.active.data?.current &&
      event.over &&
      event.over.id === "edit-chapter-dropable"
    ) {
      const file = event.active.data.current as CourseFileType;
      handleAddFileToChapter(file);
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
      <DragOverlay modifiers={[restrictToWindowEdges]} dropAnimation={null}>
        {activeFile ? <CourseFileCard file={activeFile} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DndContextProvider;
