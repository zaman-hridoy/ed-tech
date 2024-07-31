"use client";

import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/hooks/use-course-store";
import { CourseFileType } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit3, MenuIcon, Trash2Icon } from "lucide-react";

interface Props {
  file: CourseFileType;
  chapterId: string;
}

const TableFileRow = ({ file, chapterId }: Props) => {
  const { handleRemoveFileFromChapter } = useCourseStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr key={file.id} className="bg-white" ref={setNodeRef} style={style}>
      <td className="py-2">
        <Button
          className=" text-slate-900 w-auto h-auto p-1 cursor-grabbing"
          size="icon"
          variant="ghost"
          {...attributes}
          {...listeners}
        >
          <MenuIcon className="w-4 h-4 text-inherit" />
        </Button>
      </td>
      <td
        align="left"
        className="text-slate-900 text-sm font-semibold tracking-tight p-2"
      >
        <p className="w-full break-all lg:line-clamp-2" title={file.title}>
          {file.title}
        </p>
      </td>
      <td
        align="right"
        className="text-slate-900 text-sm font-semibold tracking-tight whitespace-nowrap p-2"
      >
        {file.type}
      </td>
      <td
        align="right"
        className="text-slate-900 text-sm font-semibold tracking-tight p-2"
      >
        {file.contentType}
      </td>
      <td align="right" className="p-2">
        <div className="flex items-center justify-end h-full gap-1">
          <Button
            className="text-[var(--brand-color-secondary)] hover:bg-[var(--brand-color-secondary)] hover:text-white w-auto h-auto p-1"
            variant="ghost"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            className="w-auto h-auto p-1 text-rose-400 hover:bg-rose-400 hover:text-white"
            variant="ghost"
            onClick={() => handleRemoveFileFromChapter(chapterId, file.id)}
          >
            <Trash2Icon className="w-4 h-4 " />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TableFileRow;
