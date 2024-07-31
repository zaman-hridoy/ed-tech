"use client";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { Channel, Member, Profile } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa6";
import { GiPlainCircle } from "react-icons/gi";
import { RiUserShared2Fill } from "react-icons/ri";

type MemberType = Member & {
  profile: Profile;
};

type ChannelType = Channel & {
  profile: Profile;
  members: MemberType[];
};

interface Props {
  user: Profile;
  channelId: number;
  onSuccess?: (channel: ChannelType) => void;
}

const ChannelSearchUserItem = ({ user, channelId, onSuccess }: Props) => {
  const router = useRouter();
  const [isAdded, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddMember = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/channels/add-user", {
        userProfileId: user.id,
        channelId,
      });
      setAdded(true);
      if (onSuccess) {
        onSuccess(res.data);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.Please try again later!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/channels/remove-user", {
        userProfileId: user.id,
        channelId,
      });
      setAdded(false);
      if (onSuccess) {
        onSuccess(res.data);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.Please try again later!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="group flex w-full items-center gap-x-2 rounded-md text-slate-700 tracking-tighter font-semibold cursor-pointer hover:bg-slate-200 transition p-2">
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

      {isAdded ? (
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto group-hover:bg-[var(--brand-color)] group-hover:text-white gap-x-1"
          onClick={handleRemoveMember}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RiUserShared2Fill className="w-4 h-4 text-inherit" />
          )}
          Remove
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto group-hover:bg-[var(--brand-color)] group-hover:text-white gap-x-1"
          disabled={loading}
          onClick={handleAddMember}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FaUserPlus className="w-4 h-4 text-inherit" />
          )}
          Add
        </Button>
      )}
    </button>
  );
};

export default ChannelSearchUserItem;
