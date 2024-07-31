"use client";

import { Button } from "@/components/ui/button";
import { TreeNodeType } from "@/lib/types";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaFolder } from "react-icons/fa6";
import { DriveFolderActions } from "./drive-folder-actions";

const DriveFolderCard = ({ id, name, ...rest }: TreeNodeType) => {
  const router = useRouter();
  return (
    <div className="bg-white shadow-sm shadow-[var(--brand-shadow)] rounded-lg cursor-pointer relative pr-7">
      <div
        className="p-2 flex items-center gap-x-2"
        onClick={() => router.push(`/my-drive/${id}`)}
      >
        <FaFolder className="shrink-0 w-4 h-4 text-sky-400" />
        <p className="text-sm flex-1 line-clamp-1">{name}</p>
      </div>
      <DriveFolderActions folder={{ id, name, ...rest }}>
        <Button
          size="icon"
          className="w-auto h-auto p-1 absolute top-[6px] right-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          variant="ghost"
        >
          <MoreVertical className="w-4 h-4 text-inherit" />
        </Button>
      </DriveFolderActions>
    </div>
  );
};

export default DriveFolderCard;
