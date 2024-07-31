import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import DriveSearchInput from "../_components/drive-search-input";
import FileLoadingSkeleton from "../_components/file-loading-skeleton";
import FolderLoadingSkeleton from "../_components/folder-loading-skeleton";

const DriveLoadingPage = () => {
  return (
    <div className="p-4 space-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <DriveSearchInput pathname="/my-drive" />
      </Suspense>

      <div className="space-y-6 select-none">
        <Skeleton className="w-28 h-6 bg-slate-200" />
        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-slate-500">Recent</h5>

          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {[1, 2, 3, 4].map((ele) => (
              <FileLoadingSkeleton key={ele} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-slate-500">Folders</h5>

          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {[1, 2, 3].map((ele) => (
              <FolderLoadingSkeleton key={ele} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-slate-500">Files</h5>

          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {[1, 2, 3, 4, 5, 6].map((ele) => (
              <FileLoadingSkeleton key={ele} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriveLoadingPage;
