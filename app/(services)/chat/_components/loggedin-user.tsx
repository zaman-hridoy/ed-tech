"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import UserChatAvatar from "@/components/user-chat-avatar";
import { Profile } from "@prisma/client";
import { IoMdSettings } from "react-icons/io";

interface Props {
  profile: Profile;
}

const LoggedInUser = ({ profile }: Props) => {
  return (
    <div className="bg-zinc-100 p-2 flex items-center gap-x-1">
      <UserChatAvatar
        src={profile.imageUrl}
        className="w-10 h-10"
        isActive={profile.isActive}
      />
      <div className="flex flex-col">
        <span className="text-sm text-black font-medium tracking-tight">
          {profile.name}
        </span>
        <span className="text-xs text-slate-800 font-normal tracking-tight">
          {profile.role}
        </span>
      </div>
      <ActionTooltip label="User settings">
        <Button
          className="w-auto h-auto p-1 ml-auto"
          variant="ghost"
          size="icon"
        >
          <IoMdSettings className="w-5 h-5" />
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default LoggedInUser;
