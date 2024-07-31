import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { redirect } from "next/navigation";
import ChannelInfo from "../../_components/channel-info";
import ChatHeader from "../../_components/chat-header";
import ChatInputArea from "../../_components/chat-input-area";
import ChatMessages from "../../_components/chat-messages";
import SambaVideoSession from "../../_components/samba-video-session";
import ChatMessagesWrapper from "./_components/chat-messages-wrapper";
import InfopanelWrapper from "./_components/info-pannel-wrapper";

interface Props {
  params: { channelId: string };
}

const ChannelIdPage = async ({ params }: Props) => {
  const profile = await getChatProfile();
  if (!profile) return redirect("/");

  const channel = await db.channel.findUnique({
    where: {
      id: +params.channelId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          profile: {
            name: "asc",
          },
        },
      },
      profile: true,
    },
  });

  const member = await db.member.findFirst({
    where: {
      channelId: +params.channelId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect(`/chat`);
  }

  return (
    <main className="h-full relative">
      <ChatHeader
        type="channel"
        channel={channel}
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
        }}
      />
      <InfopanelWrapper>
        <ChannelInfo channel={channel} />
      </InfopanelWrapper>
      <ChatMessagesWrapper>
        <div className="bg-white h-full rounded-md flex pb-6 pt-2 flex-col gap-y-2">
          {/* <AudioVideoPanel chatId={channel.id} profile={profile} /> */}
          <div className="h-1/2">
            <SambaVideoSession />
          </div>
          <ChatMessages
            type="channel"
            name={channel.name}
            chatId={channel.id}
            member={member}
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
            }}
            paramKey="channelId"
            paramValue={channel.id}
            // for edited input
            members={channel.members}
          />
          <ChatInputArea
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
            }}
            members={channel.members}
          />
        </div>
      </ChatMessagesWrapper>
    </main>
  );
};

export default ChannelIdPage;
