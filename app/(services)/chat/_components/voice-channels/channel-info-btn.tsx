"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Channel } from "@prisma/client";
import { IoIosSettings } from "react-icons/io";

interface Props {
  channel: Channel;
}

const ChannelInfoBtn = ({ channel }: Props) => {
  const modal = useModal();
  return (
    <ActionTooltip label="Edit channel">
      <Button
        className="w-auto h-auto p-1 ml-auto"
        variant="ghost"
        onClick={() =>
          modal.onModalOpen("EDIT_CHANNEL_MODAL", { channelId: channel.id })
        }
      >
        <IoIosSettings className="w-4 h-4 font-bold" />
      </Button>
    </ActionTooltip>
  );
};

export default ChannelInfoBtn;
