"use client";

import ActionTooltip from "@/components/action-tooltip";
import { ConfirmAlertModal } from "@/components/confirm-alert-modal";
import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/hooks/use-course-store";
import { ChapterType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu, X } from "lucide-react";

interface Props {
  chapter: ChapterType;
}

const ChapterItem = ({ chapter }: Props) => {
  const { handleActiveChapter, handleDeleteChapter } = useCourseStore();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ActionTooltip key={chapter.id} label={chapter.chapterName} side="right">
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "group flex items-center text-sm font-semibold text-slate-700 justify-start gap-x-2 py-[6px] cursor-pointer hover:bg-slate-100 px-2 rounded-md",
          chapter.isActive &&
            "bg-[var(--brand-color)] text-white hover:bg-[var(--brand-color)] hover:text-white"
        )}
        onClick={() => handleActiveChapter(chapter.id)}
      >
        <Button
          {...attributes}
          {...listeners}
          variant="ghost"
          className="w-6 h-6 cursor-grabbing hover:text-inherit hover:bg-transparent"
        >
          <Menu className="w-4 h-4 text-inherit shrink-0" />
        </Button>

        <p className="line-clamp-1">{chapter.chapterName}</p>
        <div className="ml-auto">
          <ConfirmAlertModal
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your chapter and remove your data from this chapter."
            onContinue={() => handleDeleteChapter(chapter.id)}
          >
            <Button
              size="icon"
              variant="destructive"
              className="h-6 w-6 shrink-0 p-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition"
            >
              <X className="h-4 w-4" />
            </Button>
          </ConfirmAlertModal>
        </div>
      </div>
    </ActionTooltip>
  );
};

export default ChapterItem;
