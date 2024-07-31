"use client";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { FriendRequest, Profile } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa6";
import { GiPlainCircle } from "react-icons/gi";
import { RiUserShared2Fill } from "react-icons/ri";

type RequestType = FriendRequest & {
  sender: Profile;
};

type SearchUserType = Profile & {
  receivedFriendRequests: RequestType[];
};

interface Props {
  user: SearchUserType;
}

const SearchUserItem = ({ user }: Props) => {
  const session = useSession();
  const [request, setRequest] = useState<RequestType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session.data) {
      const request = user.receivedFriendRequests.find(
        (request) => session.data?.user?.userId === request?.sender?.userId
      );
      if (request) {
        setRequest(request);
      }
    }
  }, [session, user]);

  const handleAddFriend = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/socket/users/add-friend", {
        receiverId: user.id,
      });
      setRequest(res.data);
    } catch (error) {
      toast.error("Something went wrong.Please try again later!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      setLoading(true);
      await axios.post("/api/socket/users/cancel-friend-request", {
        receiverId: user.id,
        requestId: request?.id,
      });
      setRequest(null);
    } catch (error) {
      toast.error("Something went wrong.Please try again later!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="group flex w-full items-center gap-x-2 rounded-md text-slate-700 tracking-tighter font-semibold cursor-pointer hover:bg-zinc-100 transition p-2">
      <UserAvatar className="h-8 w-8" src={user.imageUrl} />
      <GiPlainCircle
        className={cn(
          "w-3 h-3 shrink-0 text-slate-300",
          user.isActive && "text-green-500"
        )}
      />
      <span className="truncate text-inherit">
        {user.name}{" "}
        <span className="text-sm font-semibold text-zinc-500 ml-1">
          ({user.role})
        </span>
      </span>

      {request ? (
        <Fragment>
          {request.status === "PENDING" && (
            <Button
              variant="secondary"
              size="sm"
              className="ml-auto group-hover:bg-[var(--brand-color)] group-hover:text-white gap-x-1"
              onClick={handleCancelFriendRequest}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RiUserShared2Fill className="w-4 h-4 text-inherit" />
              )}
              Friend Request Sent
            </Button>
          )}
          {request.status === "ACCEPTED" && (
            <Button
              variant="secondary"
              size="sm"
              className="ml-auto group-hover:bg-[var(--brand-color)] group-hover:text-white gap-x-1"
              asChild
            >
              <Link href={`/chat/conversations/${user.id}`}>Send Message</Link>
            </Button>
          )}
        </Fragment>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto group-hover:bg-[var(--brand-color)] group-hover:text-white gap-x-1"
          disabled={loading}
          onClick={handleAddFriend}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FaUserPlus className="w-4 h-4 text-inherit" />
          )}
          Add Friend
        </Button>
      )}
    </button>
  );
};

export default SearchUserItem;
