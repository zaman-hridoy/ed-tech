"use client";

import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { Member, Message, Profile, Reaction } from "@prisma/client";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useRef } from "react";
import ChatWelcome from "../chat-welcome";
import ChatItem from "./chat-item";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type ReactionType = Reaction & {
  member: Member & {
    profile: Profile;
  };
};

type MessageWithMemberWithProfileWithReactions = Message & {
  member: Member & {
    profile: Profile;
  };
  reaction: ReactionType[];
};

type MemberWithProfile = Member & {
  profile: Profile;
};

interface Props {
  name: string;
  member: Member;
  chatId: number;
  apiUrl: string;
  socketQuery: Record<string, number>;
  paramKey: "channelId" | "conversationId";
  paramValue: number;
  type: "channel" | "conversation";

  // for chat item
  members: MemberWithProfile[];
  socketUrl: string;
}

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,

  // for chat item
  members,
  socketUrl,
}: Props) => {
  const queryKey = `${type}:${chatId}`;
  const addKey = `${type}:${chatId}:messages`;
  const updateKey = `${type}:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });

  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center h-full">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500">Loading messages</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center h-full">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500">Something went wrong!</p>
      </div>
    );
  }

  return (
    <div
      ref={chatRef}
      className="h-full flex-1 overflow-y-auto chat-scrollbar flex flex-col"
    >
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome name={name} type={type} />}

      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 text-xs my-4 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, idx) => (
          <Fragment key={idx}>
            {group?.items?.map(
              (message: MessageWithMemberWithProfileWithReactions) => (
                <ChatItem
                  key={message.id}
                  id={message.id}
                  member={message.member}
                  currentMember={member}
                  content={message.content}
                  isDeleted={message.isDeleted}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  isUpdated={message.updatedAt !== message.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                  members={members}
                  reaction={message.reaction}
                />
              )
            )}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
