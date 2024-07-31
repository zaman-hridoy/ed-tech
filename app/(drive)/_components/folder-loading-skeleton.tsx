import { Skeleton } from "@/components/ui/skeleton";

const FolderLoadingSkeleton = () => {
  return (
    <div className="bg-white shadow-sm shadow-[var(--brand-shadow)] rounded-lg">
      <div className="p-2 flex items-center justify-between gap-x-2">
        <Skeleton className="shrink-0 w-4 h-4 bg-sky-400" />
        <Skeleton className="w-2/3 h-4" />
      </div>
    </div>
  );
};

export default FolderLoadingSkeleton;
