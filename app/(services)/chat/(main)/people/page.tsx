"use client";
import EmptySection from "@/components/empty-section";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { FriendRequest, Profile } from "@prisma/client";
import axios from "axios";
import { Users2 } from "lucide-react";
import qs from "query-string";
import { useEffect, useState } from "react";
import SearchUserItem from "./_components/search-user-item";

type SearchUserType = Profile & {
  receivedFriendRequests: (FriendRequest & {
    sender: Profile;
  })[];
};

const ChatPeoplePage = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);
  const [results, setResults] = useState<SearchUserType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const url = qs.stringifyUrl({
          url: "/api/users/search",
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
            Add Friends
          </h4>
          <p className="text-sm text-zinc-500">
            You can add friends by searching their usernames or by email.
          </p>
          <Input
            placeholder="Search by username or email"
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-4"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="h-full px-2 overflow-y-auto no-scrollbar">
          {results.map((user) => (
            <SearchUserItem key={user.id} user={user} />
          ))}
          {results.length === 0 && (
            <EmptySection
              emptyText="This list is currently empty"
              icon={<Users2 className="text-zinc-400" />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPeoplePage;
