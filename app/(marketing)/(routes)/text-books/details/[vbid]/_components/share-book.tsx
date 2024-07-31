"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { FacebookIcon, LinkedinIcon } from "lucide-react";
import { MdEmail } from "react-icons/md";

const ShareBook = () => {
  return (
    <div className="flex items-center w-full justify-center gap-x-6 mt-4">
      <ActionTooltip label="Share on email">
        <Button
          variant="outline"
          className="w-8 h-8 p-0 flex items-center justify-center border-2 border-zinc-500 rounded-full"
        >
          <MdEmail className="text-inherit w-5 h-5 text-zinc-500" />
        </Button>
      </ActionTooltip>
      <ActionTooltip label="Share on facebook">
        <Button
          variant="outline"
          className="w-8 h-8 p-0 flex items-center justify-center border-2 border-zinc-500 rounded-full"
        >
          <FacebookIcon className="text-inherit w-5 h-5 text-zinc-500" />
        </Button>
      </ActionTooltip>

      <ActionTooltip label="Share on Linkedin">
        <Button
          variant="outline"
          className="w-8 h-8 p-0 flex items-center justify-center border-2 border-zinc-500 rounded-full"
        >
          <LinkedinIcon className="text-inherit w-5 h-5 text-zinc-500" />
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default ShareBook;
