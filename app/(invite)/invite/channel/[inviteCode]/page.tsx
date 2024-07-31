import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import Image from "next/image";
import { redirect } from "next/navigation";
import { GiPlainCircle } from "react-icons/gi";
import AcceptBtn from "./accept-btn";

const ChannelInvitePage = async ({
  params,
}: {
  params: { inviteCode: string };
}) => {
  const profile = await getChatProfile();
  if (!profile) return redirect("/");
  if (!params.inviteCode) return redirect("/");

  const existingChannel = await db.channel.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingChannel) {
    return redirect(`/chat/channels/${existingChannel.id}`);
  }

  const channel = await db.channel.findFirst({
    where: {
      inviteCode: params.inviteCode,
    },
    include: {
      profile: true,
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!channel) {
    return redirect("/");
  }

  const activeMembers = channel.members.filter(
    (member) => member.profile.isActive
  );
  const inActiveMembers = channel.members.filter(
    (member) => !member.profile.isActive
  );

  return (
    <div className="h-full bg-emerald-200 flex items-center justify-center select-none relative">
      <Image
        src="/invite-bg.svg"
        alt="invite bg"
        fill
        priority
        className="object-cover"
      />
      <Card className="max-w-sm w-full p-6 flex flex-col items-center justify-center gap-y-2 relative">
        <p className="text-sm text-slate-700 font-medium">
          <strong>{channel.profile.name}</strong> invited you to join
        </p>
        <span className="text-2xl font-semibold text-black">
          {channel.name}
        </span>
        <div className="flex items-center gap-x-5">
          {activeMembers.length > 0 && (
            <span className="text-sm text-slate-600 font-medium flex items-center gap-x-1">
              <GiPlainCircle className="w-3 h-3 shrink-0 text-green-500" />
              {activeMembers.length} Online
            </span>
          )}

          {inActiveMembers.length > 0 && (
            <span className="text-sm text-slate-600 font-medium flex items-center gap-x-1">
              <GiPlainCircle className="w-3 h-3 shrink-0 text-slate-300" />
              {inActiveMembers.length} Offline
            </span>
          )}
        </div>
        <AcceptBtn inviteCode={params.inviteCode} />
      </Card>
    </div>
  );
};

export default ChannelInvitePage;
