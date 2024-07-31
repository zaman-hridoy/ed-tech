"use client";

import { Button } from "@/components/ui/button";
import { TreeNodeType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaFolder } from "react-icons/fa6";
import { ExamFolderActions } from "./exam-folder-actions";

const ExamFolderCard = ({
  id,
  name,
  pageType,
  onActionSuccess,
  onClickFolder,
  border,
  ...rest
}: TreeNodeType & {
  pageType: "exam-library" | "shared-with" | "shared-by";
  onActionSuccess?: () => void;
  onClickFolder?: (folderId: number) => void;
  border?: boolean;
}) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "bg-white shadow-sm shadow-[var(--brand-shadow)] rounded-lg cursor-pointer relative pr-7",
        border && "border"
      )}
    >
      <div
        className="p-2 flex items-center gap-x-2 w-full"
        onClick={() => {
          if (onClickFolder) {
            onClickFolder(id);
          } else {
            router.push(`/${pageType}/${id}`);
          }
        }}
      >
        <FaFolder className="shrink-0 w-4 h-4 text-sky-400" />
        <p className="text-sm flex-1 line-clamp-1">{name}</p>
      </div>
      {pageType === "exam-library" && (
        <ExamFolderActions
          folder={{ id, name, ...rest }}
          onActionSuccess={onActionSuccess}
        >
          <Button
            size="icon"
            className="w-auto h-auto p-1 absolute top-[6px] right-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            variant="ghost"
          >
            <MoreVertical className="w-4 h-4 text-inherit" />
          </Button>
        </ExamFolderActions>
      )}
    </div>
  );
};

export default ExamFolderCard;
