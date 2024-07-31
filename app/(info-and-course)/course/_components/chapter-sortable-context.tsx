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

const ChapterSortableContext = ({ children }: Props) => {
  const { collection, handleSortChapters } = useCourseStore();
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
      const oldIndex = chapters.findIndex((item) => item.id === activeFileId);
      const newIndex = chapters.findIndex((item) => item.id === overFileId);
      const updatedChapters = arrayMove(chapters, oldIndex, newIndex);

      handleSortChapters(updatedChapters);
    }
  };

  const chapters = collection.chapters || [];
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext items={chapters} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default ChapterSortableContext;
