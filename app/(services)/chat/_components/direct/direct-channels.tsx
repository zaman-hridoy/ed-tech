"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { Profile } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import UserItem from "./user-item ";

// type ConversationUserWithProfile = Conversation & {
//   userProfile: Profile;
// };

type UserType = {
  id: number;
  userProfile: Profile;
};

interface Props {
  users: UserType[];
}

const DirectChannels = ({ users }: Props) => {
  const [open, setOpen] = useState(true);
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
          Direct messages
        </span>
        <ActionTooltip label="Create DM">
          <Button className="w-auto h-auto p-1 ml-auto" variant="ghost">
            <Plus className="w-4 h-4 font-bold" />
          </Button>
        </ActionTooltip>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="pl-2 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DirectChannels;
