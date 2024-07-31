"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCourseStore } from "@/hooks/use-course-store";
import { PlusSquare } from "lucide-react";
import ChapterSortableContext from "../../_components/chapter-sortable-context";
import AddChapterModal from "./add-chapter-modal";
import ChapterItem from "./chapter-item";

const ChapterList = () => {
  const { collection, handleDeleteChapter, handleActiveChapter } =
    useCourseStore();

  return (
    <div className="w-full h-full">
      {collection?.chapters?.length === 0 && (
        <div className="w-full flex items-center justify-center mt-10">
          <AddChapterModal>
            <Button
              variant="outline"
              className="flex-col w-auto h-auto text-sm gap-2"
            >
              <PlusSquare />
              <span>Add a new chapter</span>
            </Button>
          </AddChapterModal>
        </div>
      )}
      {collection?.chapters && collection?.chapters?.length > 0 && (
        <div className="w-full flex flex-col mt-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 tracking-tight font-bold">
                Book chapters
              </span>
              <AddChapterModal>
                <Button className="w-auto h-auto p-0 px-2 py-[6px] bg-[var(--brand-color-secondary)] hover:bg-[var(--brand-color-secondary)] gap-x-1 text-xs">
                  <PlusSquare className="w-4 h-4 text-inherit text-white" />
                  Add new
                </Button>
              </AddChapterModal>
            </div>
            <Separator className="my-1" />
          </div>
          <div className="space-y-1">
            <ChapterSortableContext>
              {collection?.chapters?.map((chapter) => (
                <ChapterItem key={chapter.id} chapter={chapter} />
              ))}
            </ChapterSortableContext>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterList;
