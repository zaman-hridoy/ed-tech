"use client";

import { useModal } from "@/hooks/use-modal-store";
import { CourseFileType } from "@/lib/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import format from "date-fns/format";
import { GripVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import AudioPreview from "./audio-preview";
import BlogPreview from "./blog-preview";
import DocumentPreview from "./document-preview";
import ImagePreview from "./image-preview";
import VideoPreview from "./video-preview";

interface Props {
  file: CourseFileType;
  educatorId?: number;
  courseId?: number;
  chapterId?: number;
  enableDrag?: boolean;
}

const RecentFileCard = ({
  file,
  educatorId,
  courseId,
  chapterId,
  enableDrag = true,
}: Props) => {
  const { data } = useSession();
  const modal = useModal();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: file.id,
      data: file,
      disabled: !enableDrag,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      className="w-full flex items-start gap-y-2 rounded-md overflow-hidden cursor-pointer"
    >
      <div
        className="shrink-0 w-[110px] aspect-video border bg-zinc-50 relative rounded-xl overflow-hidden hover:rounded-none transition-all duration-300"
        onClick={() =>
          modal.onModalOpen("COURSE_FILE_VIEWER", {
            file,
            educatorId,
            courseId,
            chapterId,
          })
        }
      >
        {file.contentType === "Video" && <VideoPreview file={file} />}
        {file.contentType === "Image" && <ImagePreview file={file} />}
        {file.contentType === "Blog" && <BlogPreview file={file} />}
        {file.contentType === "Audio" && <AudioPreview file={file} />}
        {file.contentType === "Document" && <DocumentPreview file={file} />}
        <span className="absolute bottom-2 right-2 rounded-full bg-[var(--brand-color)] text-white font-semibold text-xs px-2 py-1">
          {file.contentType}
        </span>
      </div>
      <div className="flex items-start gap-x-1 py-2 pt-0 text-left">
        {enableDrag && data && (
          <button
            className="shrink-0 w-6 h-8 bg-zinc-200 mt-1 p-1 flex items-center justify-center rounded-md cursor-grabbing"
            {...listeners}
            {...attributes}
          >
            <GripVertical className="h-5 w-5" />
          </button>
        )}

        <div className="w-full overflow-x-hidden flex flex-col">
          <p
            className="text-sm xl:text-base font-semibold tracking-tighter text-slate-900 line-clamp-2"
            title={file.title}
          >
            {file.title}
          </p>
          <span className="text-xs font-semibold tracking-tight text-slate-500">
            {format(new Date(file.createdAt), "MMM dd, yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentFileCard;
