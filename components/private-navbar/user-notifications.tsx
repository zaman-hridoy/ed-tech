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
import { Bell, BellOffIcon } from "lucide-react";
import Link from "next/link";
import EmptySection from "../empty-section";

const UserNotifications = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <ActionTooltip label="Notifications">
          <Button
            className="text-[#EDF67D] w-[30px] h-[30px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50 relative"
            size="icon"
            variant="ghost"
          >
            <Bell className="w-6 h-6" />
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
        <div className="flex items-center space-x-3 justify-between">
          <p className="text-xs font-semibold text-slate-900 tracking-tight">
            New Notifications
          </p>
          <Button
            size="sm"
            className="text-xs py-1 h-auto text-[var(--brand-color)] hover:text-[var(--brand-color)] tracking-tight font-semibold"
            variant="ghost"
          >
            Mark all as read
          </Button>
        </div>
        <Separator className="my-2" />
        <ScrollArea className="h-72 w-full">
          <EmptySection
            icon={<BellOffIcon className="w-10 h-10 text-zinc-300" />}
            emptyText="No notifications"
          />
          {/* {tags.map((tag) => (
            <Fragment key={tag}>
              <div key={tag} className="text-sm">
                {tag}
              </div>
              <Separator className="my-2" />
            </Fragment>
          ))} */}
        </ScrollArea>
        <Button
          size="sm"
          className="w-full mt-2 text-sm"
          asChild
          variant="outline"
          disabled
        >
          <Link href="/">Show all notifications</Link>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserNotifications;
