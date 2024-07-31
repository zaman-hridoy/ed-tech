import { Channel, Profile } from "@prisma/client";
import { Hash } from "lucide-react";
import JoinBtn from "./accept-btn";

type ResultsType = Channel & {
  profile: Profile;
};

interface Props {
  channel: ResultsType;
}

const SearchChannelItem = ({ channel }: Props) => {
  return (
    <button className="group flex w-full items-center gap-x-2 rounded-md text-slate-700 tracking-tighter font-semibold cursor-pointer hover:bg-zinc-100 transition p-2">
      <Hash className="w-5 h-5 text-inherit" />
      <span className="truncate text-inherit text-sm md:text-base">
        {channel.name}
        <span className="font-normal ml-1 text-[var(--brand-color)]">
          ( by {channel.profile.name} )
        </span>
      </span>

      <JoinBtn inviteCode={channel.inviteCode} />
    </button>
  );
};

export default SearchChannelItem;
