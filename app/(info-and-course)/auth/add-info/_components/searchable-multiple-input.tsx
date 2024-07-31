"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";
import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { Check, Loader2, Search, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  control: any;
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  apiUrl: string;
  method: "get" | "post";
  setCourses: Dispatch<SetStateAction<OptionType[]>>;
}

type OptionType = {
  id: number;
  name: string;
  value: string;
};

const SeachableMultipleInput = ({
  control,
  name,
  label,
  disabled = false,
  placeholder,
  apiUrl,
  method,
  setCourses,
}: Props) => {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    setCourses(selectedOptions);
  }, [selectedOptions, setCourses]);

  useEffect(() => {
    async function getSearchData() {
      try {
        setLoading(true);
        let res = null;
        if (method === "get") {
          res = await axios.get(`${apiUrl}/${debounceValue || "a"}/10`, {
            headers: {
              Authorization: `${session?.user?.accessToken}`,
            },
          });
        }
        if (method === "post") {
          res = await axios.post(
            `${apiUrl}/${debounceValue || "a"}/10`,
            {},
            {
              headers: {
                Authorization: `${session?.user?.accessToken}`,
              },
            }
          );
        }

        if (res && res.data) {
          setOptions(res.data.content);
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
  }, [debounceValue, session, apiUrl, method]);

  const isDisabled = (option: OptionType) => {
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
          <FormLabel className="text-sm font-semibold">{label}</FormLabel>

          <Popover>
            <PopoverTrigger>
              <div className="border border-slate-200 rounded-md px-3 py-2 flex items-center gap-2 flex-wrap">
                {selectedOptions.map((option) => (
                  <Badge
                    key={option.id}
                    variant="secondary"
                    className="flex items-center gap-x-2 px-2 text-sm bg-slate-100 shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {option.name}{" "}
                    <XCircle
                      onClick={(e) => {
                        setSelectedOptions((prev) =>
                          prev.filter((el) => el.id !== option.id)
                        );
                      }}
                      className="w-4 h-4"
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
              <div className="flex flex-col gap-y-1 w-full">
                {options.map((option) => (
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

                    {option.name}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default SeachableMultipleInput;
