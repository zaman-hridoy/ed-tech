"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouceValue = useDebounce(value);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/course/search",
        query: {
          query: debouceValue,
        },
      },
      { skipNull: true }
    );
    router.push(url);
  }, [debouceValue, router]);

  return (
    <div>
      <Input
        placeholder="Search coures"
        className="focus-visible:ring-0 focus-visible:ring-offset-0 drop-shadow-lg px-4 bg-white border-0 text-base h-14"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
