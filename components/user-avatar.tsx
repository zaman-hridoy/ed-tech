"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  src?: string;
  className?: string;
  fallbackName?: string;
}

const UserAvatar = ({ src, className, fallbackName = "U" }: Props) => {
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
  );
};

export default UserAvatar;
