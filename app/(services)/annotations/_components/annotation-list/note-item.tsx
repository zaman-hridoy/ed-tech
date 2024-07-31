"use client";

import { ConfirmAlertModal } from "@/components/confirm-alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import { formatvideoDuration } from "@/lib/helper-methods";
import { AnnotationNote, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Edit3, MoreVertical, Trash2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AnnotationUpdateForm from "../annotation-update-form";

interface Props {
  note: AnnotationNote & {
    profile: Profile;
  };
  handleSeekTo: (time: number) => void;
  mode: "edit" | "preview";
}

const NoteItem = ({ note, handleSeekTo, mode }: Props) => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/annotations/${note.annotationId}/notes/${note.id}`
      );
      queryClient.refetchQueries({ queryKey: ["annotation-notes"] });
      toast.success("Successfully deleted.");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="group flex items-start gap-x-2 px-4 py-2 hover:bg-slate-100 cursor-pointer transition"
      onClick={() => handleSeekTo(note.played)}
    >
      <UserAvatar src={note.profile.imageUrl} className="w-10 h-10" />
      <div className="flex flex-col w-full space-y-2">
        <div className="flex items-start gap-1 w-full">
          <div className="w-full">
            <h4 className="text-base tracking-tight font-semibold text-slate-800">
              {note.profile.name}{" "}
              <span className="text-xs text-zinc-500">
                ({note.profile.role})
              </span>
            </h4>
            <p className="text-xs text-zinc-500">
              {formatDistanceToNow(new Date(note.createdAt))}
            </p>
          </div>

          <span className="m-0 bg-yellow-200 px-2 py-1 text-[var(--brand-color)] rounded-md text-sm font-semibold flex items-center justify-center ml-auto">
            {formatvideoDuration(note.played)}
          </span>
          {session.data?.user?.userId === note.profile.userId &&
            mode === "edit" && (
              <DropdownMenu open={open}>
                <DropdownMenuTrigger asChild onClick={() => setOpen(true)}>
                  <Button
                    variant="secondary"
                    className="ml-auto p-1 w-auto h-auto"
                    size="icon"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  onInteractOutside={() => setOpen(false)}
                >
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setIsEditing(true);
                      setOpen(false);
                    }}
                  >
                    Edit
                    <DropdownMenuShortcut>
                      <Edit3 className="w-5 h-5" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <ConfirmAlertModal
                    title="Are you absolutely sure?"
                    description="This action cannot be undone. This will permanently delete your note."
                    onContinue={handleDelete}
                    loading={loading}
                  >
                    <DropdownMenuItem className="cursor-pointer focus:text-rose-500">
                      Delete
                      <DropdownMenuShortcut>
                        <Trash2Icon className="w-5 h-5" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </ConfirmAlertModal>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
        </div>
        {!isEditing && (
          <div className="space-y-1">
            <p className="text-sm text-slate-800 font-semibold">{note.title}</p>
            <p className="text-sm text-slate-500">{note.note}</p>
          </div>
        )}
        {isEditing && (
          <AnnotationUpdateForm
            note={note}
            onSuccess={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NoteItem;
