"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import UserChatAvatar from "@/components/user-chat-avatar";
import { usernameToSlug } from "@/lib/helper-methods";
import { MemberRole, Profile } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  memberId: number;
  profile: Profile;
  memberRole: MemberRole;
  side?: "top" | "right" | "bottom" | "left";
}

export function UserInfo({
  children,
  memberId,
  profile,
  side,
  memberRole,
}: Props) {
  const { data } = useSession();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="w-60" side={side} align="start">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <UserChatAvatar
              src={profile.imageUrl}
              className="w-12 h-12"
              isActive={profile.isActive}
            />
            <div>
              {data && data.user?.userId === profile.userId ? (
                <h3 className="text-base tracking-tight text-black font-medium">
                  {profile.name}
                </h3>
              ) : (
                <Link
                  href={`/${usernameToSlug(profile.name)}/${profile.userId}`}
                  className="text-base tracking-tight text-black font-medium"
                >
                  {profile.name}
                </Link>
              )}

              <p className="text-xs tracking-tight text-zinc-500 font-medium">
                {profile.role}
              </p>
            </div>
          </div>
          <Separator className="my-2" />
          <div>
            <h4 className="text-sm text-black tracking-tight font-semibold uppercase">
              Member Since
            </h4>
            <p className="text-zinc-500 font-medium text-xs">
              {format(new Date(profile.createdAt), "MMM ddd, yyyy")}
            </p>
          </div>
          <div className="mt-4">
            <h4 className="text-sm text-black tracking-tight font-semibold uppercase">
              Role
            </h4>
            <p className="text-zinc-500 font-medium text-xs">{memberRole}</p>
          </div>
          {data && data.user?.userId !== profile.userId && (
            <Button
              className="rounded-full w-full mt-4"
              size="sm"
              variant="primary"
              onClick={() => router.push(`/chat/conversations/${profile.id}`)}
            >
              Message
            </Button>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
