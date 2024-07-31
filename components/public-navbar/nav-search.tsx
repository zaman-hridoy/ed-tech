"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Book, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

type SearchItemType = {
  label: string;
  type: "user" | "book" | "course";
  id: number;
};

const dummyData: SearchItemType[] = [
  { id: 1, label: "John Doe", type: "user" },
  { id: 2, label: "John Miller", type: "user" },
  { id: 3, label: "Introduction to finance", type: "book" },
  { id: 4, label: "COUN 024 A43712 by CHAVEZBAQUERO", type: "course" },
  { id: 5, label: "The Leadership Experience", type: "book" },
];

const NavSearch = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-0 group md:px-4 md:py-2 flex items-center gap-x-2 transition md:border rounded-full w-full md:bg-slate-100"
      >
        <SearchIcon className="w-6 h-6 md:w-4 md:h-4 text-[var(--brand-color)] sm:text-[#EDF67D] md:text-zinc-500" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition hidden md:block">
          Search...
        </p>
        <kbd className="hidden pointer-events-none md:inline-flex h-5 md:items-center md:gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground ml-auto">
          <span className="text-sm">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search courses, books and educators..." />
        <CommandEmpty>No Results Found</CommandEmpty>

        <CommandGroup heading="Results">
          {dummyData?.map(({ id, label, type }) => (
            <CommandItem
              key={id}
              onSelect={() => console.log({ id, type })}
              className="cursor-pointer"
            >
              <Book className="w-4 h-4 mr-2" /> <span> {label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandDialog>
    </>
  );
};

export default NavSearch;
