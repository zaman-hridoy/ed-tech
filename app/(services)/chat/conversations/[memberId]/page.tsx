import { getOrCreateConversation } from "@/lib/conversation";
import { getChatProfile } from "@/lib/get-chat-profile";
import { redirect } from "next/navigation";
import ChatHeader from "../../_components/chat-header";
import ChatInputArea from "../../_components/chat-input-area";
import ChatMessages from "../../_components/chat-messages";
import ConversationInfo from "../../_components/conversationInfo";
import ChatMessagesWrapper from "../../channels/[channelId]/_components/chat-messages-wrapper";
import InfopanelWrapper from "../../channels/[channelId]/_components/info-pannel-wrapper";

interface Props {
  params: {
    memberId: string;
  };
}

const ChannelIdPage = async ({ params }: Props) => {
  const profile = await getChatProfile();
  if (!profile) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    profile.id,
    +params.memberId // other member profile id
  );

  if (!conversation) {
    return redirect(`/chat`);
  }

  const { members } = conversation;
  const currentMember = members.find(
    (member) => member.profileId === profile.id
  );
  const otherMember = members.find((member) => member.profileId !== profile.id);

  if (!otherMember || !currentMember) {
    return redirect(`/chat`);
  }

  console.log(otherMember);

  return (
    <main className="h-full relative">
      <ChatHeader
        type="conversation"
        otherMember={otherMember}
        apiUrl="/api/socket/direct-messages"
        query={{
          conversationId: conversation.id,
        }}
      />
      <InfopanelWrapper>
        <ConversationInfo otherMember={otherMember} />
      </InfopanelWrapper>
      <ChatMessagesWrapper>
        <div className="bg-white h-full rounded-md flex pb-6 pt-2 flex-col gap-y-2">
          <ChatMessages
            type="conversation"
            name={otherMember.profile.name}
            chatId={conversation.id}
            member={currentMember}
            apiUrl="/api/direct-messages"
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
            paramKey="conversationId"
            paramValue={conversation.id}
            // for edited input
            members={members}
          />
          <ChatInputArea
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
            members={members}
          />
        </div>
      </ChatMessagesWrapper>
    </main>
  );
};

export default ChannelIdPage;
