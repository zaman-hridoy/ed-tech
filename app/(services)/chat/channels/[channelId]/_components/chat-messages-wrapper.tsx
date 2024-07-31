"use client";

import { useAppSettings } from "@/hooks/use-app-settings";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

const ChatMessagesWrapper = ({ children }: Props) => {
  const appSettings = useAppSettings();
  return (
    <div
      className={cn(
        "h-full transition-all px-1 pt-14",
        appSettings.showChatMembersPanel && "pr-[292px]"
      )}
    >
      {children}
    </div>
  );
};

export default ChatMessagesWrapper;
