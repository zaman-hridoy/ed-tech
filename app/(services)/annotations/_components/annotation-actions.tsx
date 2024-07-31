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
import { Annotation, Profile } from "@prisma/client";
import axios from "axios";
import {
  ArrowLeft,
  CopyIcon,
  MoreVertical,
  Save,
  Trash2Icon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import SaveToExamModal from "./save-to-exam-modal";

interface Props {
  annotation: Annotation & {
    profile: Profile;
  };
  mode: "edit" | "preview";
}

const AnnotationActions = ({ annotation, mode }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/annotations/${annotation.id}`);
      toast.success("Successfully deleted.");
      setOpen(false);
      router.back();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <SaveToExamModal
        isModalOpen={open}
        onClose={() => setOpen(false)}
        annotation={annotation}
      />
      <div className="flex items-center gap-x-2 px-4 py-2 w-full pl-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <DropdownMenu open={openOptions}>
          <DropdownMenuTrigger asChild onClick={() => setOpenOptions(true)}>
            <Button variant="secondary" className="ml-auto" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="end"
            onInteractOutside={() => setOpenOptions(false)}
          >
            {session?.data && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setOpen(true)}
              >
                Save to Exam Library
                <DropdownMenuShortcut>
                  <Save className="w-5 h-5" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem className="cursor-pointer">
              Copy Shareable Link
              <DropdownMenuShortcut>
                <CopyIcon className="w-5 h-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            {annotation.profile?.userId === session?.data?.user?.userId &&
              mode === "edit" && (
                <Fragment>
                  <DropdownMenuSeparator />
                  <ConfirmAlertModal
                    title="Are you absolutely sure?"
                    description="This action cannot be undone. This will permanently delete your notes."
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
                </Fragment>
              )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Fragment>
  );
};

export default AnnotationActions;
