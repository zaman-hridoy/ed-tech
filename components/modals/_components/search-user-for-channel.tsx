"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Channel, Member, Profile } from "@prisma/client";
import axios from "axios";
import { Loader2, Search } from "lucide-react";
import qs from "query-string";
import { useEffect, useState } from "react";
import ChannelSearchUserItem from "./channel-search-user-item";

type MemberType = Member & {
  profile: Profile;
};

type ChannelType = Channel & {
  profile: Profile;
  members: MemberType[];
};

interface Props {
  channelId: number;
  onSuccess?: (channel: ChannelType) => void;
}

const SearchUserForChannel = ({ channelId, onSuccess }: Props) => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const url = qs.stringifyUrl({
          url: "/api/users/search-for-channel",
          query: {
            query: debounceValue,
            take: 20,
            channelId,
          },
        });
        const res = await axios.get(url);
        setResults(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [debounceValue, channelId]);
  return (
    <div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for friends"
          className="text-sm pl-8 bg-slate-200 border-none h-[35px] text-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-600"
          autoFocus
          onChange={(e) => setValue(e.target.value)}
        />
        {loading ? (
          <Loader2 className="w-4 h-4 absolute top-[10px] left-2" />
        ) : (
          <Search className="w-4 h-4 absolute top-[10px] left-2" />
        )}
      </div>
      <div className="h-full overflow-y-auto no-scrollbar transition-all max-h-[250px] mt-1">
        {results.map((user) => (
          <ChannelSearchUserItem
            key={user.id}
            user={user}
            channelId={channelId}
            onSuccess={onSuccess}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchUserForChannel;
