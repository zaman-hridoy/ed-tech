"use client";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { FriendRequest, Profile } from "@prisma/client";
import Link from "next/link";

interface Props {
  friendRequest: FriendRequest & {
    sender: Profile;
    receiver: Profile;
  };
}

const AcceptedFriendRequest = ({ friendRequest }: Props) => {
  return (
    <div className="group flex items-start gap-x-2">
      <UserAvatar src={friendRequest.receiver.imageUrl} className="w-10 h-10" />
      <div className="space-y-2">
        <p className="text-sm text-zinc-500 tracking-tight">
          <span className="font-bold mr-1 text-slate-800">
            {friendRequest.receiver.name}
          </span>
          accepted your friend request.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto group-hover:bg-[var(--brand-color)] group-hover:text-white gap-x-1"
          asChild
        >
          <Link href={`/chat/conversations/${friendRequest.receiver.id}`}>
            Send Message
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AcceptedFriendRequest;
