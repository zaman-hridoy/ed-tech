"use client";
import EmptySection from "@/components/empty-section";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Channel, Profile } from "@prisma/client";
import axios from "axios";
import { Hash } from "lucide-react";
import qs from "query-string";
import { useEffect, useState } from "react";
import SearchChannelItem from "./_components/search-channel-item";

type ResultsType = Channel & {
  profile: Profile;
};

const ChatChannelPage = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);
  const [results, setResults] = useState<ResultsType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const url = qs.stringifyUrl({
          url: "/api/channels/search",
          query: {
            query: debounceValue,
            take: 20,
          },
        });
        const res = await axios.get(url);
        setResults(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [debounceValue]);

  return (
    <div className="h-full pt-[68px] px-[2px]">
      <div className="bg-white rounded-md h-full flex flex-col">
        <div className="px-4 pt-4">
          <h4 className="text-base md:text-xl text-black font-medium">
            Join Channels
          </h4>
          <p className="text-sm text-zinc-500">
            You can join public channels by searching their name.
          </p>
          <Input
            placeholder="Search by name"
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-4"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="h-full px-2 overflow-y-auto no-scrollbar">
          {results.map((channel) => (
            <SearchChannelItem key={channel.id} channel={channel} />
          ))}

          {results.length === 0 && (
            <EmptySection
              emptyText="This list is currently empty"
              icon={<Hash className="text-zinc-400" />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatChannelPage;
