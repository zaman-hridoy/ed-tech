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
import { Edit, EyeIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineAnnotation } from "react-icons/hi";

interface Props {
  children: React.ReactNode;
  file: TreeNodeType;
}

export function ExamFileActions({ children, file }: Props) {
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const router = useRouter();

  const { onModalOpen } = useModal();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.post(
        "/content/deleteExamLibraryContent",
        {
          id: file.id,
        },
        {
          headers: {
            Authorization: session.user?.accessToken,
          },
        }
      );
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
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="gap-x-2 cursor-pointer"
            onClick={() => onModalOpen("DRIVE_NAME_UPDATE_MODAL", file)}
          >
            <Edit className="w-4 h-4 text-inherit" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-x-2 cursor-pointer"
            onClick={() => onModalOpen("EXAM_FILE_VIEWER", file)}
          >
            <EyeIcon className="w-4 h-4 text-inherit" />
            Open
          </DropdownMenuItem>
          {file.data?.annotationId && (
            <DropdownMenuItem
              className="gap-x-2 cursor-pointer"
              onClick={() =>
                router.push(
                  `/annotations/preview?annotationId=${file.data?.annotationId}`
                )
              }
            >
              <HiOutlineAnnotation className="w-4 h-4 text-inherit" />
              Preview annotations
            </DropdownMenuItem>
          )}
          {file.data?.annotationId && (
            <DropdownMenuItem
              className="gap-x-2 cursor-pointer"
              onClick={() =>
                router.push(
                  `/annotations/editor?annotationId=${file.data?.annotationId}`
                )
              }
            >
              <HiOutlineAnnotation className="w-4 h-4 text-inherit" />
              Add annotations
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
