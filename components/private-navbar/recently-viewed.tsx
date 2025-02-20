"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "@/lib/instance";
import { CourseFileType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import CourseFileCard from "../course-file-card";

const RecentlyViewed = () => {
  const session = useSession();
  const [open, setOpen] = useState(false);

  const fetchData = () => {
    return axios.post(
      "/content/getContentlyViewContentNew",
      { offset: 0, limit: 12 },
      {
        headers: {
          Authorization: session?.data?.user?.accessToken,
        },
      }
    );
  };

  const { data, status } = useQuery({
    queryKey: ["nav_recent_viewed_content"],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    enabled: open,
  });
  const files: CourseFileType[] = data?.data?.data || [];
  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger>
        <ActionTooltip label="Recently viewed content">
          <Button
            className="text-[#EDF67D] w-[30px] h-[30px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50 relative"
            size="icon"
            variant="ghost"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 4C18.7348 4 18.4804 4.10536 18.2929 4.29289C18.1054 4.48043 18 4.73478 18 5V15C18 15.7956 17.6839 16.5587 17.1213 17.1213C16.5587 17.6839 15.7956 18 15 18H5C4.73478 18 4.48043 18.1054 4.29289 18.2929C4.10536 18.4804 4 18.7348 4 19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H15C16.3261 20 17.5979 19.4732 18.5355 18.5355C19.4732 17.5979 20 16.3261 20 15V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4ZM16 13V3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.316071 13.7956 0 13 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V13C0 13.7956 0.316071 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H13C13.7956 16 14.5587 15.6839 15.1213 15.1213C15.6839 14.5587 16 13.7956 16 13ZM8 2H10V6.86L9.64 6.56C9.46031 6.41033 9.23385 6.32837 9 6.32837C8.76615 6.32837 8.53969 6.41033 8.36 6.56L8 6.86V2ZM2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6V9C5.99999 9.19116 6.05477 9.37833 6.15785 9.53932C6.26094 9.7003 6.40801 9.82837 6.58164 9.90835C6.75527 9.98832 6.94819 10.0169 7.13754 9.99056C7.32688 9.96427 7.50473 9.88426 7.65 9.76L9 8.63L10.35 9.76C10.5311 9.91491 10.7617 10 11 10C11.1447 9.99898 11.2876 9.96835 11.42 9.91C11.5936 9.82967 11.7405 9.70124 11.8433 9.53995C11.9461 9.37866 12.0005 9.19127 12 9V2H13C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13Z"
                fill="#EDF67D"
              />
            </svg>

            <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--brand-color-alert)] rounded-full"></span>
          </Button>
        </ActionTooltip>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={12}
        className="w-80"
      >
        <p className="text-xs font-semibold text-slate-900 tracking-tight">
          Recently Viewed
        </p>
        <Separator className="my-2" />
        <ScrollArea className="h-72 w-full">
          {status === "pending" && (
            <div className="text-center">
              <Loader2 className="w-5 h-5 animate-spin text-slate-50" />
            </div>
          )}
          {status === "success" &&
            files.map((file) => (
              <Fragment key={file.id}>
                <CourseFileCard
                  file={file}
                  enableDrag={false}
                  isHorizontal={true}
                />
                <Separator className="my-2" />
              </Fragment>
            ))}
        </ScrollArea>
        <Button
          size="sm"
          className="w-full mt-2 text-sm"
          asChild
          variant="outline"
        >
          <Link href="/">Show all recently viewed items</Link>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default RecentlyViewed;
