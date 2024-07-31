"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  inviteCode: string;
}

const JoinBtn = ({ inviteCode }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isJoined, seIsJoined] = useState(false);

  const onJoin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/channels/join", {
        inviteCode,
      });
      toast.success("Join successfully.");
      seIsJoined(true);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant="secondary"
      size="sm"
      className="ml-auto group-hover:bg-[var(--brand-color)] group-hover:text-white gap-x-1"
      onClick={onJoin}
      disabled={loading || isJoined}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
      {loading ? "Joining..." : isJoined ? "Joined" : "Join"}
    </Button>
  );
};

export default JoinBtn;
