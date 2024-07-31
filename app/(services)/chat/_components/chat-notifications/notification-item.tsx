"use client";
import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import {
  DirectMessage,
  FriendRequest,
  Message,
  Notification,
  Profile,
} from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AcceptedFriendRequest from "./accepted-friend-request";
import PendingFriendRequest from "./pending-friend-request";

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
  item: NotificationItemType;
}

const NotificationItem = ({ item }: Props) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const handleRemoveFriendRequest = async () => {
    try {
      setLoading(true);
      await axios.post("/api/socket/users/remove-notification", {
        id: item.id,
      });
      queryClient.refetchQueries({ queryKey: ["chat-notifications"] });
    } catch (error) {
      toast.error("Something went wrong.Please try again later!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = () => {
    if (item.friendRequest) {
      if (item.friendRequest.status === "PENDING") {
        return <PendingFriendRequest friendRequest={item.friendRequest} />;
      } else if (item.friendRequest.status === "ACCEPTED") {
        return <AcceptedFriendRequest friendRequest={item.friendRequest} />;
      }
    } else {
      return null;
    }
  };
  return (
    <div className="relative group hover:bg-zinc-100 p-2 cursor-pointer pr-4">
      {renderItem()}{" "}
      <ActionTooltip label="Remove notification" side="left">
        <Button
          className="hidden absolute top-0 right-0 group-hover:flex transition w-auto h-auto p-2 group-hover:text-rose-500 group-hover:bg-white"
          variant="ghost"
          size="icon"
          onClick={handleRemoveFriendRequest}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default NotificationItem;
