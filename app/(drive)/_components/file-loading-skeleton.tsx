import { Skeleton } from "@/components/ui/skeleton";

const FileLoadingSkeleton = () => {
  return (
    <div className="p-2 bg-white shadow-sm shadow-[var(--brand-shadow)] rounded-lg space-y-1 cursor-pointer">
      <div className="flex items-center justify-between gap-x-2">
        <Skeleton className="shrink-0 w-4 h-4 rounded-full" />
        <Skeleton className="w-2/3 h-4" />
      </div>
      <div className="aspect-video bg-slate-50 overflow-hidden flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};

export default FileLoadingSkeleton;
