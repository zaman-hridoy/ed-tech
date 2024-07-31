"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";

interface Props {
  pathname: string;
}

const formSchema = z.object({
  query: z.string().min(1),
});

type FormSchemaType = z.infer<typeof formSchema>;

const DriveSearchInput = ({ pathname }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams?.get("q") || "";
  const [value, setValue] = useState(search);
  const debounceValue = useDebounce(value);

  useEffect(() => {
    if (debounceValue) {
      router.push(`${pathname}/search?q=${encodeURIComponent(debounceValue)}`);
    }
  }, [router, debounceValue, pathname]);

  return (
    <div className="group border px-4 rounded-full bg-slate-200 hover:bg-white transition-all duration-100">
      <div className="flex items-center">
        <Search className="shrink-0 w-4 h-4 text-slate-500" />
        <Input
          placeholder="Search..."
          className="w-full bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </div>
    </div>
  );
};

export default DriveSearchInput;
