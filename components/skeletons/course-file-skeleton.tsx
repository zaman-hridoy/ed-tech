"use client";

import { Skeleton } from "@/components/ui/skeleton";

const CourseFileSkeleton = () => {
  return (
    <div className="w-full bg-white border border-slate-200 shadow-sm shadow-[var(--brand-shadow)] flex flex-col gap-y-2 justify-between rounded-md overflow-hidden cursor-pointer">
      <div className="w-full aspect-video">
        <Skeleton className="w-full h-full" />
      </div>
      <button className="flex flex-col p-2 pt-0 text-left gap-y-2">
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-10 h-3" />
      </button>
    </div>
  );
};

export default CourseFileSkeleton;
