"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { useAppSettings } from "@/hooks/use-app-settings";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";

interface Props {
  type: "channel" | "conversation";
}

const ToggleMemberBtn = ({ type }: Props) => {
  const appSettings = useAppSettings();
  const renderLabel = () => {
    if (appSettings.showChatMembersPanel) {
      if (type === "channel") {
        return "Hide member list";
      } else {
        return "Hide User Profile";
      }
    } else {
      if (type === "channel") {
        return "Show member list";
      } else {
        return "Show User Profile";
      }
    }
  };
  return (
    <ActionTooltip label={renderLabel()}>
      <Button
        className="w-auto h-auto p-1 text-slate-600 mr-2"
        variant="ghost"
        size="icon"
        onClick={appSettings.handleToggleChatmembersPanel}
      >
        {type === "channel" && <FaUserGroup className="w-5 h-5" />}
        {type === "conversation" && <BiSolidUserCircle className="w-6 h-6" />}
      </Button>
    </ActionTooltip>
  );
};

export default ToggleMemberBtn;
