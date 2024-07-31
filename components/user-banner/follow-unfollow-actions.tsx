"use client";

import { getFollowersById } from "@/actions/get-followers-by-id";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";

const FollowUnfollowActions = ({ otherUserId }: { otherUserId: number }) => {
  const { data } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);

  const getFollowings = useCallback(
    async (logginUserId: number) => {
      const users = await getFollowersById(logginUserId);

      const status = users.some((user) => +user.userId === otherUserId);
      setIsFollowing(status);
    },
    [otherUserId]
  );

  useEffect(() => {
    if (data) {
      getFollowings(data.user?.userId);
    }
  }, [getFollowings, data]);

  return (
    <div className="mt-2">
      {isFollowing ? (
        <Button
          className="rounded-full bg-[var(--brand-color-secondary)] min-w-[100px] hover:text-[var(--brand-color-secondary)] hover:bg-white transition"
          size="sm"
        >
          Unfollow
        </Button>
      ) : (
        <Button
          className="rounded-full bg-[var(--brand-color-secondary)] min-w-[100px] hover:text-[var(--brand-color-secondary)] hover:bg-white transition"
          size="sm"
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowUnfollowActions;
