"use client";

import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { Member, Profile } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GiPlainCircle } from "react-icons/gi";

interface Props {
  member: Member & {
    profile: Profile;
  };
}

const DirectUserItem = ({ member }: Props) => {
  const { data } = useSession();
  const router = useRouter();

  return (
    <span
      onClick={() => {
        if (data?.user.userId !== member.profile.userId) {
          router.push(`/chat/conversations/${member.id}`);
        }
      }}
      className="flex w-full items-center gap-x-2 rounded-md transition text-slate-700 tracking-tighter font-semibold cursor-pointer"
    >
      <UserAvatar className="h-8 w-8" src={member.profile.imageUrl} />
      <GiPlainCircle
        className={cn(
          "w-3 h-3 shrink-0 text-slate-300",
          member.profile.isActive && "text-green-500"
        )}
      />
      <span className="truncate text-inherit">
        {member.profile.name}{" "}
        {data?.user.userId === member.profile.userId && <span>(you)</span>}
      </span>
    </span>
  );
};

export default DirectUserItem;
