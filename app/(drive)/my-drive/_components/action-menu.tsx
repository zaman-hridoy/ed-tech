"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { FolderPlus, Upload } from "lucide-react";

interface Props {
  children: React.ReactNode;
  parentId?: number | null;
}

export function ActionMenu({ children, parentId }: Props) {
  const { onModalOpen } = useModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="start">
        <DropdownMenuLabel className="text-slate-500 text-xs tracking-tight">
          You can add content or organize your content from here.
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="gap-x-2 cursor-pointer"
            onClick={() => onModalOpen("CREATE_DRIVE_FOLDER", { parentId })}
          >
            <FolderPlus className="w-4 h-4" />
            New folder
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-x-2 cursor-pointer"
            onClick={() => onModalOpen("UPLOAD_DRIVE_FILES", { parentId })}
          >
            <Upload className="w-4 h-4" />
            Upload file
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
