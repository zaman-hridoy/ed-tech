"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Channel } from "@prisma/client";
import { HiUserAdd } from "react-icons/hi";

interface Props {
  channel: Channel;
}

const InviteBtn = ({ channel }: Props) => {
  const { onModalOpen } = useModal();
  return (
    <ActionTooltip label="Create Invite">
      <Button
        className="w-auto h-auto p-1 ml-auto"
        variant="ghost"
        onClick={() => onModalOpen("INVITE_CHANNEL_MODAL", channel)}
      >
        <HiUserAdd className="w-4 h-4 font-bold" />
      </Button>
    </ActionTooltip>
  );
};

export default InviteBtn;
