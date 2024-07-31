import ActionTooltip from "@/components/action-tooltip";
import { Channel } from "@prisma/client";
import Link from "next/link";
import { HiHashtag } from "react-icons/hi";
import ChannelInfoBtn from "./channel-info-btn";
import InviteBtn from "./invite-btn";

interface Props {
  channel: Channel;
}

const ChannelItem = ({ channel }: Props) => {
  return (
    <span className="group flex relative items-center gap-x-1 hover:bg-[var(--brand-color)] hover:text-white py-[5px] px-[8px] rounded-md transition text-slate-700 font-medium text-base">
      <HiHashtag className="w-5 h-5 shrink-0 text-inherit" />
      <ActionTooltip
        label="Properties-or-variant-label-to-animate to while the component is
            pressed."
        side="right"
        sideOffset={70}
      >
        <Link
          href={`/chat/channels/${channel.id}`}
          className="truncate text-inherit lowercase flex-1"
        >
          {channel.name}
        </Link>
      </ActionTooltip>
      <div className="hidden group-hover:flex items-center ml-auto">
        <InviteBtn channel={channel} />
        <ChannelInfoBtn channel={channel} />
      </div>
    </span>
  );
};

export default ChannelItem;
