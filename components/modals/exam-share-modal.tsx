"use client";

import { getFollowers } from "@/actions/get-followers";
import { getProfileById } from "@/actions/get-profile-by-id";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import axios from "@/lib/instance";
import { SessionWithUserType, UserProfileType } from "@/lib/types";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import UserAvatar from "../user-avatar";

export function ExamShareModal() {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const router = useRouter();

  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "EXAM_FOLDER_SHARE_MODAL";

  const [profile, setProfile] = useState<UserProfileType | null>(null);

  useEffect(() => {
    async function getProfile(userId: number) {
      const profile = await getProfileById(userId);
      const followers = getFollowers(userId);
      setProfile(profile);
    }

    if (session && isModalOpen) {
      getProfile(+session?.user?.userId);
    }
  }, [session, isModalOpen]);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShare = async (userId: number) => {
    try {
      setLoading(true);
      await axios.post(
        "/content/editExamLibrary",
        {
          id: modal.data?.id,
          name: "",
          student_id: session?.user?.userId,
          status: true,
        },
        {
          headers: {
            Authorization: `${session?.user?.accessToken}`,
          },
        }
      );

      // refetch tree subfolders
      toast.success("Renamed successfully.");
      router.refresh();
      // queryClient.refetchQueries({
      //   queryKey: modal.data?.parentFolderId
      //     ? [`exam-sub-folders_${folder?.parentFolderId}`]
      //     : ["drive-parent-folders"],
      // });
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    modal.onModalClose();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-2 py-2">
          <DialogTitle className="flex items-center justify-between gap-x-2 w-full">
            <p className="shrink-0 flex-1 text-base text-slate-500 px-2 line-clamp-1">
              Who do you want to share
            </p>
            <DialogClose asChild className="ml-auto shrink-0 ">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="w-auto h-auto p-2 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 pt-0">
          <div className="space-y-3">
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
              placeholder="Seach by name..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="space-y-1">
              <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-x-2">
                  <UserAvatar src={profile?.image} className="w-9 h-9" />
                  <div className="flex flex-col text-sm font-semibold tracking-tight">
                    <span>{profile?.name}</span>
                    <span className="text-xs text-slate-500">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="rounded-full w-auto h-auto px-2 py-1 text-xs ml-auto"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
          <Separator className="mt-4 mb-2" />
          <div className="space-y-2">
            <p className="text-xs text-slate-500 font-[500]">Owner</p>
            <div className="flex items-center gap-x-2">
              <UserAvatar src={profile?.image} className="w-10 h-10" />
              <div className="flex flex-col text-sm font-semibold tracking-tight">
                <span>{profile?.name}</span>
                <span className="text-xs text-slate-500">
                  {session?.user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
