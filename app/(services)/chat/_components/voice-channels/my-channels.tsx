"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Channel } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import ChannelItem from "./channel-item";

interface Props {
  channels: Channel[];
}

const MyChannels = ({ channels }: Props) => {
  const [open, setOpen] = useState(true);
  const modal = useModal();

  return (
    <div>
      <div className="flex items-center gap-x-1">
        <motion.button
          className="shrink-0 w-auto h-auto p-0 hover:bg-transparent"
          onClick={() => setOpen((prev) => !prev)}
          animate={{
            rotate: open ? 90 : 0,
          }}
        >
          <HiChevronRight className="w-4 h-4 font-bold" />
        </motion.button>
        <span
          onClick={() => setOpen((prev) => !prev)}
          className="uppercase cursor-pointer text-xs font-medium text-slate-600 tracking-tight"
        >
          Text Channels
        </span>
        <ActionTooltip label="Create channel">
          <Button
            className="w-auto h-auto p-1 ml-auto"
            variant="ghost"
            onClick={() => modal.onModalOpen("CREATE_CHANNEL_MODAL")}
          >
            <Plus className="w-4 h-4 font-bold" />
          </Button>
        </ActionTooltip>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="pl-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {channels.map((channel) => (
              <ChannelItem key={channel.id} channel={channel} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyChannels;
