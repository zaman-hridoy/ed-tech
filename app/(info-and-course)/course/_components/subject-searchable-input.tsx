"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { Loader2, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  control: any;
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
}

type OptionType = {
  id: number;
  course_name: string;
};

const SubjectSeachableInput = ({
  control,
  name,
  label,
  disabled = false,
  placeholder,
}: Props) => {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getSearchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `/content/courses/getCourse/10/${debounceValue || "a"}`,
          {
            headers: {
              Authorization: `${session?.user?.accessToken}`,
            },
          }
        );

        if (
          res &&
          res.data &&
          res.data?.courses &&
          res.data?.courses?.length > 0
        ) {
          const optionList = res.data?.courses.map((opt: any) => ({
            id: opt.id,
            course_name: opt.course_name,
          }));
          setOptions(optionList);
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

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-y-[4px]">
          <FormLabel className="text-sm font-semibold mt-[3]">
            {label}
          </FormLabel>
          <Select
            {...field}
            value={`${field.value?.id || ""}`}
            onValueChange={(val) => {
              const selectedOption = options.find(
                (opt) => opt.id === Number(val)
              );
              if (selectedOption) {
                field.onChange(selectedOption);
              }
            }}
          >
            <FormControl>
              <SelectTrigger className="focus:ring-0 focus:ring-offset-0 bg-white">
                <SelectValue
                  className="m-0"
                  placeholder={placeholder || "Select..."}
                />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="p-3">
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
              <ScrollArea className="h-auto">
                {options.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={`${item.id}`}
                    className="cursor-pointer"
                  >
                    {item.course_name}
                  </SelectItem>
                ))}
                {options.length === 0 && (
                  <p className="text-sm font-semibold tracking-tight textsla500 text-center p-4">
                    No result found!
                  </p>
                )}
              </ScrollArea>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default SubjectSeachableInput;
