"use client";

import { ConfirmAlertModal } from "@/components/confirm-alert-modal";
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
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { Edit, Move, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  children: React.ReactNode;
  folder: TreeNodeType;
}

export function DriveFolderActions({ children, folder }: Props) {
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const router = useRouter();

  const { onModalOpen } = useModal();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.post(`/dam/folder-service/remove/`, {
        id: folder.id,
        user_id: session?.user?.userId,
      });
      toast.success("Folder deleted successfully.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete. Please try again later!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48"
        side="bottom"
        align="end"
        sideOffset={10}
        onInteractOutside={() => setOpen(false)}
      >
        <DropdownMenuLabel>Folder options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="gap-x-2 cursor-pointer"
            onClick={() => onModalOpen("MOVE_DRIVE_FOLDER_AND_FILES", folder)}
          >
            <Move className="w-4 h-4 text-inherit" />
            Move
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-x-2 cursor-pointer"
            onClick={() => onModalOpen("DRIVE_NAME_UPDATE_MODAL", folder)}
          >
            <Edit className="w-4 h-4 text-inherit" />
            Rename
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <ConfirmAlertModal
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your folder and files."
          onContinue={handleDelete}
          loading={loading}
        >
          <DropdownMenuItem className="gap-x-2 cursor-pointer text-red-400 hover:text-red-500 w-full">
            <Trash2 className="w-4 h-4 text-inherit" />
            Delete
          </DropdownMenuItem>
        </ConfirmAlertModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
