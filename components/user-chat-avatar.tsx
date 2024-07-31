"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GiPlainCircle } from "react-icons/gi";
import { Skeleton } from "./ui/skeleton";

interface Props {
  src?: string;
  className?: string;
  fallbackName?: string;
  isActive?: boolean;
  dotClassName?: string;
}

const UserChatAvatar = ({
  src,
  className,
  fallbackName = "U",
  isActive = false,
  dotClassName,
}: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Skeleton
        className={cn(
          "h-7 w-7 border-2 cursor-pointer bg-slate-200",
          className
        )}
      />
    );
  return (
    <div className="relative inline-block">
      <Avatar
        className={cn(
          "h-7 w-7 border-2 cursor-pointer bg-slate-200 relative",
          className
        )}
      >
        <AvatarImage src={src} />
        <AvatarFallback>
          <div className="relative w-full h-full">
            <Image
              fill
              src="/placeholder.jpg"
              alt={fallbackName}
              className="object-cover"
              sizes="100%"
              priority
            />
          </div>
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "absolute bottom-0 z-30 right-0 p-[2px] bg-white rounded-full",
          dotClassName
        )}
      >
        <GiPlainCircle
          className={cn(
            "w-3 h-3 shrink-0 text-slate-300",
            isActive && "text-green-500"
          )}
        />
      </div>
    </div>
  );
};

export default UserChatAvatar;
