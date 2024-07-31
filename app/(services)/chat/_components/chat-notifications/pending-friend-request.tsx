"use client";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { FriendRequest, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  friendRequest: FriendRequest & {
    sender: Profile;
    receiver: Profile;
  };
}

const PendingFriendRequest = ({ friendRequest }: Props) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const handleAcceptFriendRequest = async () => {
    try {
      setAcceptLoading(true);
      await axios.post("/api/socket/users/accept-friend-request", {
        senderId: friendRequest?.sender?.id,
        requestId: friendRequest?.id,
      });
      queryClient.refetchQueries({ queryKey: ["chat-notifications"] });
    } catch (error) {
      toast.error("Something went wrong.Please try again later!");
      console.log(error);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      setLoading(true);
      await axios.post("/api/socket/users/cancel-friend-request", {
        receiverId: friendRequest?.receiver?.id,
        requestId: friendRequest?.id,
      });
      queryClient.refetchQueries({ queryKey: ["chat-notifications"] });
    } catch (error) {
      toast.error("Something went wrong.Please try again later!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-start gap-x-2">
      <UserAvatar src={friendRequest.sender.imageUrl} className="w-10 h-10" />
      <div className="space-y-2">
        <p className="text-sm text-zinc-500 tracking-tight">
          <span className="font-bold mr-1 text-slate-800">
            {friendRequest.sender.name}
          </span>
          sent you a friend request.
        </p>
        <div className="flex items-center gap-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAcceptFriendRequest}
            disabled={loading || acceptLoading}
          >
            {acceptLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}{" "}
            Confirm
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCancelFriendRequest}
            disabled={loading || acceptLoading}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingFriendRequest;
