"use client";

import EmptySection from "@/components/empty-section";
import { useSocket } from "@/components/providers/socket-provider";
import { Separator } from "@/components/ui/separator";
import { useChatNotifications } from "@/hooks/use-chat-notifications";
import {
  DirectMessage,
  FriendRequest,
  Message,
  Notification,
  Profile,
} from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { BellOff, Loader2, ServerCrash } from "lucide-react";
import qs from "query-string";
import { Fragment } from "react";
import NotificationItem from "./notification-item";

type NotificationItemType = Notification & {
  profile: Profile;
  directMessage?: DirectMessage | null;
  message?: Message | null;
  friendRequest?:
    | (FriendRequest & {
        sender: Profile;
        receiver: Profile;
      })
    | null;
};

interface Props {
  currentProfile: Profile;
}

const ChatNotifications = ({ currentProfile }: Props) => {
  const { isConnected } = useSocket();
  const addKey = `notification:user:${currentProfile.id}:add`;
  const updateKey = `notification:user:${currentProfile.id}:update`;
  const deleteKey = `notification:user:${currentProfile.id}:delete`;

  const fetchNotifications = async (pageParam = undefined) => {
    const url = qs.stringifyUrl(
      {
        url: "/api/notifications",
        query: {
          cursor: pageParam,
        },
      },
      {
        skipNull: true,
      }
    );
    const res = await axios.get(url);
    return res.data;
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["chat-notifications"],
      queryFn: ({ pageParam }) => fetchNotifications(pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 5000,
    });

  useChatNotifications({ addKey, updateKey, deleteKey });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center h-full">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500">Loading Notifications</p>
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
    <div className="flex flex-col h-full bg-white rounded-md overflow-y-auto no-scrollbar">
      <div className="p-2">
        <h4 className="text-sm text-zinc-500 tracking-tight">Notifications</h4>
      </div>
      <Separator />
      {data?.pages?.[0]?.items?.length === 0 && (
        <EmptySection
          emptyText="When a friend starts an activity -like sending a friend request or sending a message -we'll show it here!"
          icon={<BellOff className="text-zinc-400" />}
        />
      )}

      {data?.pages?.map((group, idx) => (
        <Fragment key={idx}>
          {group.items?.map((notification: NotificationItemType) => (
            <NotificationItem key={notification.id} item={notification} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default ChatNotifications;
