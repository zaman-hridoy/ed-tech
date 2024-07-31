"use client";

import { useCourseStore } from "@/hooks/use-course-store";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const FilesSortableContext = ({ children }: Props) => {
  const { collection, handleSortChapterFiles } = useCourseStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const activeFileId = active.id as string;
      const overFileId = over?.id;
      const oldIndex = chapterFiles.findIndex(
        (item) => item.id === activeFileId
      );
      const newIndex = chapterFiles.findIndex((item) => item.id === overFileId);
      const updatedFiles = arrayMove(chapterFiles, oldIndex, newIndex);

      handleSortChapterFiles(updatedFiles);
    }
  };

  const chapters = collection.chapters || [];
  const activeChapter = chapters.find((chapter) => chapter.isActive) || null;
  const chapterFiles = activeChapter?.files || [];
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext
        items={chapterFiles}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default FilesSortableContext;
