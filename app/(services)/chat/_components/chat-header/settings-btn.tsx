"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { IoMdSettings } from "react-icons/io";

interface Props {
  chatId: number;
  type: "channel" | "conversation";
}

const SettingsBtn = ({ chatId, type }: Props) => {
  const modal = useModal();
  return (
    <ActionTooltip label="Edit Channel">
      <Button
        className="w-auto h-auto p-1 text-slate-600"
        variant="ghost"
        size="icon"
        onClick={() =>
          modal.onModalOpen("EDIT_CHANNEL_MODAL", {
            channelId: chatId,
          })
        }
      >
        <IoMdSettings className="w-5 h-5" />
      </Button>
    </ActionTooltip>
  );
};

export default SettingsBtn;
