"use client";

import { Button } from "@/components/ui/button";
import { useDrivePreview } from "@/hooks/use-drive-preview";
import { TreeNodeType } from "@/lib/types";
import { ImageIcon, MoreVertical } from "lucide-react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaWordpressSimple } from "react-icons/fa";
import { FaFileLines, FaFilePdf, FaMusic } from "react-icons/fa6";
import { MdLibraryMusic } from "react-icons/md";
import { ExamFileActions } from "./exam-file-actions";
import ExamImageRenderer from "./exam-image-renderer";

const imageMimeTypes = ["Image"];
const videoMimeTypes = ["Video"];
const audioMimeTypes = ["Audio"];
const docsMimeType = [
  "Document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const pdfMimeType = ["Document", "application/pdf"];

const ExamFileCard = ({
  id,
  name,
  data,
  pageType,
  ...rest
}: TreeNodeType & {
  pageType: "exam-library" | "shared-with" | "shared-by";
}) => {
  const { onSelectFile } = useDrivePreview();
  const mimeType = data?.contentType;

  const renderIcon = () => {
    if (imageMimeTypes.includes(mimeType)) {
      return <ImageIcon className="shrink-0 w-4 h-4 text-rose-500" />;
    } else if (videoMimeTypes.includes(mimeType)) {
      return <BiSolidMoviePlay className="shrink-0 w-4 h-4 text-rose-500" />;
    } else if (audioMimeTypes.includes(mimeType)) {
      return <FaMusic className="shrink-0 w-4 h-4 text-rose-500" />;
    } else if (docsMimeType.includes(mimeType)) {
      return <FaWordpressSimple className="shrink-0 w-4 h-4 text-blue-500" />;
    } else if (pdfMimeType.includes(mimeType)) {
      return <FaFilePdf className="shrink-0 w-4 h-4 text-emerald-500" />;
    } else {
      return <FaFileLines className="shrink-0 text-slate-400 w-4 h-4" />;
    }
  };

  const getRenderer = () => {
    if (imageMimeTypes.includes(mimeType)) {
      return <ExamImageRenderer file={{ id, name, data, ...rest }} />;
    } else if (videoMimeTypes.includes(mimeType)) {
      return <BiSolidMoviePlay className="w-10 h-10 text-rose-500" />;
    } else if (audioMimeTypes.includes(mimeType)) {
      return <MdLibraryMusic className="w-10 h-10 text-rose-500" />;
    } else if (docsMimeType.includes(mimeType)) {
      return <FaWordpressSimple className="w-10 h-10 text-blue-500" />;
    } else if (pdfMimeType.includes(mimeType)) {
      return <FaFilePdf className="w-10 h-10 text-emerald-500" />;
    } else {
      return <FaFileLines className="w-10 h-10 text-slate-400" />;
    }
  };

  return (
    <div className="p-2 bg-white shadow-sm shadow-[var(--brand-shadow)] rounded-lg space-y-1 cursor-pointer">
      <div className="flex items-center justify-between gap-x-2">
        {renderIcon()}
        <p className="text-xs sm:text-sm flex-1 truncate" title={name}>
          {name}
        </p>
        {pageType === "exam-library" && (
          <ExamFileActions file={{ id, name, data, ...rest }}>
            <Button size="icon" className="w-auto h-auto p-1" variant="ghost">
              <MoreVertical className="w-4 h-4 text-inherit" />
            </Button>
          </ExamFileActions>
        )}
      </div>
      <div
        onClick={() =>
          onSelectFile("EXAM_LIBRARY", { id, name, data, ...rest })
        }
        className="aspect-video bg-slate-50 overflow-hidden flex items-center justify-center"
      >
        {getRenderer()}
      </div>
    </div>
  );
};

export default ExamFileCard;
