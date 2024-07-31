"use client";

import { usernameToSlug } from "@/lib/helper-methods";
import { FollowUserType } from "@/lib/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import UserAvatar from "./user-avatar";

interface Props {
  user: FollowUserType;
  isFollowing?: boolean;
}
const FollowUserCard = ({ user, isFollowing = false }: Props) => {
  const { data } = useSession();
  return (
    <div className="shadow-md shadow-[var(--brand-shadow)] bg-white rounded-md overflow-hidden">
      <Link href={`/${usernameToSlug(user.username)}/${user.userId}`}>
        <div className="aspect-square">
          <UserAvatar
            src={user.profilepic || ""}
            className="w-full h-full shadow-none border rounded-none object-cover"
          />
        </div>
      </Link>
      <div className="p-2 space-y-2">
        <div className="flex flex-col">
          <Link
            href={`/${usernameToSlug(user.username)}/${user.userId}`}
            className="w-fit text-base truncate font-semibold tracking-tighter text-slate-800 hover:underline hover:text-[var(--brand-color)] transition"
          >
            {user.username}
          </Link>
          <span className="text-xs truncate font-normal tracking-tighter text-slate-500">
            {user.role}
          </span>
        </div>
        {data?.user?.userId === +user.userId ? (
          <Button
            size="sm"
            className="bg-slate-200 hover:bg-slate-300 text-sm w-full"
            variant="secondary"
            asChild
          >
            <Link href="/profile/about">Visit</Link>
          </Button>
        ) : (
          <>
            {isFollowing ? (
              <Button
                size="sm"
                className="bg-slate-200 hover:bg-slate-300 text-sm w-full"
                variant="secondary"
              >
                Unfollow
              </Button>
            ) : (
              <Button size="sm" className="text-sm w-full" variant="primary">
                Follow
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowUserCard;
