import ChatNotifications from "@/app/(services)/chat/_components/chat-notifications";
import { getChatProfile } from "@/lib/get-chat-profile";
import { redirect } from "next/navigation";

const ActivityPanel = async () => {
  const profile = await getChatProfile();
  if (!profile) {
    return redirect("/");
  }
  return (
    <div className="hidden xl:block fixed top-0 right-0 w-96 pt-[68px] h-full pr-[2px]">
      <ChatNotifications currentProfile={profile} />
    </div>
  );
};

export default ActivityPanel;
