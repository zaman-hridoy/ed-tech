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

const AcceptBtn = ({ inviteCode }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onJoin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/channels/join", {
        inviteCode,
      });
      toast.success("Join successfully.");
      router.replace(`/chat/channels/${res.data?.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      className="w-full mt-4"
      variant="primary"
      size="sm"
      onClick={onJoin}
      disabled={loading}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
      {loading ? "Joining..." : "Accept Invite"}
    </Button>
  );
};

export default AcceptBtn;
