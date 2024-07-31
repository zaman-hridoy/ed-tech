"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/use-debounce";
import axios from "@/lib/instance";
import { BookType, SessionWithUserType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BookImageIcon, Check, Loader2, Search, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  control: any;
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  setBooks: Dispatch<SetStateAction<BookType[]>>;
  error?: boolean;
  initialBooks?: BookType[];
}

const SeachableMultipleBooks = ({
  control,
  name,
  label,
  disabled = false,
  placeholder,
  setBooks,
  error = false,
  initialBooks,
}: Props) => {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const [options, setOptions] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<BookType[]>([]);

  useEffect(() => {
    setBooks(selectedOptions);
  }, [selectedOptions, setBooks]);

  useEffect(() => {
    if (initialBooks && initialBooks?.length > 0) {
      setSelectedOptions(initialBooks);
    }
  }, [initialBooks]);

  useEffect(() => {
    async function getSearchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `/content/getBookBySearch/10/${debounceValue || "a"}`,
          {
            headers: {
              Authorization: `${session?.user?.accessToken}`,
            },
          }
        );

        if (res.data?.success && res.data.books?.length > 0) {
          const queryBooks: BookType[] = res.data.books?.map((book: any) => ({
            id: book?.id,
            book_name: book?.bookName,
            authors: book?.authors,
            isbns: book?.isbns,
            edition: book?.edition,
            publisher: book?.publisher,
            bookImage: book?.coverImage,
          }));
          setOptions(queryBooks);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      getSearchData();
    }
  }, [debounceValue, session]);

  const isDisabled = (option: BookType) => {
    const isAdded = selectedOptions.find((item) => item.id === option.id);
    if (isAdded) return true;
    return false;
  };

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel
            className={cn("text-sm font-semibold", error && "text-red-500")}
          >
            {label}
          </FormLabel>

          <Popover>
            <PopoverTrigger>
              <div className="border border-slate-200 rounded-md px-3 py-2 flex items-center gap-2 flex-wrap overflow-x-hidden">
                {selectedOptions.map((option) => (
                  <Badge
                    key={option.id}
                    variant="secondary"
                    className="flex items-center gap-x-2 px-2 text-sm bg-slate-100 shrink-0 max-w-[220px] relative"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <p
                      className="shrink-0 line-clamp-1 w-full text-left pr-4"
                      title={option.book_name}
                    >
                      {option.book_name}
                    </p>
                    <XCircle
                      onClick={(e) => {
                        setSelectedOptions((prev) =>
                          prev.filter((el) => el.id !== option.id)
                        );
                      }}
                      className="w-4 h-4 absolute top-1 right-1"
                    />
                  </Badge>
                ))}

                <span className="text-sm text-slate-500 tracking-tight">
                  {placeholder || "Select..."}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full" align="start">
              <div className="relative mb-2">
                <Search className="w-4 h-4 absolute left-2 top-[7px] text-[var(--brand-color)]" />
                <input
                  placeholder="Search..."
                  className="border pl-7 border-[var(--brand-color)] focus:outline-none text-sm tracking-tight rounded-full w-full px-2 py-1"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  value={value}
                />
                {loading && (
                  <Loader2 className="w-4 h-4 absolute right-2 top-[7px] text-[var(--brand-color)] animate-spin" />
                )}
              </div>
              <ScrollArea className="w-full h-[250px]">
                <div className="flex flex-col gap-y-1 w-full">
                  {options.map((option, idx) => (
                    <Button
                      key={option.id}
                      variant="ghost"
                      className="h-auto text-sm justify-start gap-x-2"
                      onClick={() =>
                        setSelectedOptions((prev) => {
                          const isAdded = prev.find(
                            (item) => item.id === option.id
                          );
                          if (!isAdded) {
                            return [...prev, option];
                          }
                          return prev;
                        })
                      }
                      disabled={isDisabled(option)}
                    >
                      {isDisabled(option) && <Check className="w-4 h-4" />}
                      <Avatar className="h-14 w-12 border-2 cursor-pointer bg-slate-200 relative rounded-sm">
                        <AvatarImage src={option?.bookImage} />
                        <AvatarFallback>
                          <div className="relative w-full h-full flex items-center justify-center">
                            <BookImageIcon className="w-10 h-10" />
                          </div>
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        {option.book_name}
                        <span className="text-xs text-slate-500 tracking-tight">
                          {option.edition} /{" "}
                          {option.authors?.map((a) => a.author)}
                        </span>
                        <span className="text-xs text-slate-500 tracking-tight">
                          {option.isbns?.map((a) => a.isbn)}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default SeachableMultipleBooks;
