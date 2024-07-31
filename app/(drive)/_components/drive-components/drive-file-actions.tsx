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
import { Edit, EyeIcon, Move, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  children: React.ReactNode;
  file: TreeNodeType;
  recent?: boolean;
}

export function DriveFileActions({ children, file, recent = false }: Props) {
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const router = useRouter();

  const { onModalOpen } = useModal();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteRecentFile = async () => {
    try {
      setLoading(true);
      await axios.post("/dam/file-service/delete-recently-view-asset/", {
        asset_id: file.id,
        folder_id: file.parentFolderId || null,
      });
      toast.success("File removed successfully.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.post("/dam/file-service/remove/", {
        id: file.id,
        user_id: session?.user?.userId,
      });
      await axios.post("/auth/users/drive-delete", {
        userId: session?.user?.userId,
        fileSizeInBytes: file.data?.size,
      });
      toast.success("File deleted successfully.");
      router.refresh();
      setOpen(false);
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
        onInteractOutside={() => setOpen(false)}
      >
        <DropdownMenuLabel>File options</DropdownMenuLabel>
        {!recent && <DropdownMenuSeparator />}

        {!recent && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="gap-x-2 cursor-pointer"
              onClick={() => onModalOpen("MOVE_DRIVE_FOLDER_AND_FILES", file)}
            >
              <Move className="w-4 h-4 text-inherit" />
              Move
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-x-2 cursor-pointer"
              onClick={() => onModalOpen("DRIVE_NAME_UPDATE_MODAL", file)}
            >
              <Edit className="w-4 h-4 text-inherit" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-x-2 cursor-pointer"
              onClick={() => onModalOpen("DRIVE_FILE_VIEWER", file)}
            >
              <EyeIcon className="w-4 h-4 text-inherit" />
              Preview
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />
        {recent ? (
          <DropdownMenuItem
            className="gap-x-2 cursor-pointer text-red-400 hover:text-red-500 w-full"
            onClick={() => {
              deleteRecentFile();
              setOpen(false);
            }}
          >
            <Trash2 className="w-4 h-4 text-inherit" />
            Remove
          </DropdownMenuItem>
        ) : (
          <ConfirmAlertModal
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your file."
            onContinue={handleDelete}
            loading={loading}
          >
            <DropdownMenuItem className="gap-x-2 cursor-pointer text-red-400 hover:text-red-500 w-full">
              <Trash2 className="w-4 h-4 text-inherit" />
              Delete
            </DropdownMenuItem>
          </ConfirmAlertModal>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
