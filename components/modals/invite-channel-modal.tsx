"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { cn } from "@/lib/utils";
import { Channel } from "@prisma/client";
import axios from "axios";
import { Check, Copy, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import SearchUserForChannel from "./_components/search-user-for-channel";

export function InviteChannelModal() {
  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "INVITE_CHANNEL_MODAL";
  const channel = modal.data as Channel;
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    modal.onModalClose();
  };

  const inviteLink = `${origin}/invite/channel/${channel.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const generateNewLink = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/channels/${channel.id}/invite-code`);
      modal.onModalOpen("INVITE_CHANNEL_MODAL", res.data);
    } catch (error: any) {
      console.log(error);
      toast.error("Error on generating new link. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  if (!isModalOpen) return null;
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white p-4">
        <DialogHeader>
          <div className="flex items-center gap-x-2">
            <DialogTitle className="font-medium flex items-center gap-x-2">
              Invite friends to # {channel.name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="ml-auto w-auto h-auto p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <SearchUserForChannel channelId={channel.id} />
        <Separator className="my-1" />

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase">
            Or send a channel invite link to a friend
          </label>
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Search for friends"
              className="text-sm h-[40px] bg-zinc-200 border-none text-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-600"
              value={inviteLink}
              disabled={loading}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onCopy}
              disabled={loading}
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            className="p-0 gap-x-2 text-[var(--brand-color)]"
            onClick={generateNewLink}
            disabled={loading}
          >
            Generate a new link{" "}
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
