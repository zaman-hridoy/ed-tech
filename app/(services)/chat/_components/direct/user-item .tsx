"use client";

import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { Profile } from "@prisma/client";
import Link from "next/link";
import { GiPlainCircle } from "react-icons/gi";

// type ConversationUserWithProfile = Conversation & {
//   userProfile: Profile;
// };

type UserType = {
  id: number;
  userProfile: Profile;
};

interface Props {
  user: UserType;
}

const UserItem = ({ user }: Props) => {
  return (
    <Link
      href={`/chat/conversations/${user.userProfile.id}`}
      className="flex w-full items-center gap-x-2 rounded-md transition text-slate-700 tracking-tighter font-semibold cursor-pointer hover:bg-zinc-200 px-1"
    >
      <UserAvatar className="h-8 w-8" src={user.userProfile.imageUrl} />
      <GiPlainCircle
        className={cn(
          "w-3 h-3 shrink-0 text-slate-300",
          user.userProfile.isActive && "text-green-500"
        )}
      />
      <span className="truncate text-inherit">{user.userProfile.name}</span>
    </Link>
  );
};

export default UserItem;
