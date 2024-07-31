import { useSocket } from "@/components/providers/socket-provider";
import {
  DirectMessage,
  FriendRequest,
  Message,
  Notification,
  Profile,
} from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

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

type ChatNotificationType = {
  addKey: string;
  updateKey: string;
  deleteKey: string;
};

export const useChatNotifications = ({
  addKey,
  updateKey,
  deleteKey,
}: ChatNotificationType) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(addKey, (notification: NotificationItemType) => {
      console.log({ addKey, deleteKey, updateKey });
      queryClient.setQueryData(["chat-notifications"], (oldData: any) => {
        console.log({ oldData });
        if (!oldData || !oldData?.pages || oldData?.pages?.length === 0) {
          return {
            pages: [{ items: [notification] }],
          };
        }

        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          items: [notification, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(updateKey, (notification: NotificationItemType) => {
      queryClient.setQueryData(["chat-notifications"], (oldData: any) => {
        if (!oldData || !oldData?.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: NotificationItemType) => {
              if (item.id === notification.id) {
                return notification;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(deleteKey, () => {
      console.log("refetch on delete");
      queryClient.refetchQueries({ queryKey: ["chat-notifications"] });
    });
  }, [socket, addKey, deleteKey, updateKey, queryClient]);
};
