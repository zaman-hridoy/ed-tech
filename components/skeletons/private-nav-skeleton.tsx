import { Skeleton } from "@/components/ui/skeleton";

const PrivateNavSkeleton = () => {
  return (
    <div className="bg-[#F6F6FF] fixed top-0 z-30 left-0 w-full px-4 md:px-8 py-3 sm:bg-[var(--brand-color)] flex flex-row items-center gap-x-2 md:gap-x-6">
      <div className="hidden sm:block lg:hidden">
        <Skeleton className="w-[35px] h-[30px]" />
      </div>

      <div className="hidden sm:block">
        <Skeleton className="w-[35px] h-[30px]" />
      </div>
      <div className="sm:hidden">
        <Skeleton className="w-[150px] h-[40px]" />
      </div>
      <div className="w-[1px] h-[15px] bg-[#EDF67D] hidden lg:block" />

      {/* dashboard */}
      <div className="hidden lg:block">
        <Skeleton className="w-[30px] h-[30px]" />
      </div>

      {/* profile */}
      <div className="hidden lg:block">
        <Skeleton className="w-[30px] h-[30px]" />
      </div>

      {/* drive */}
      <div className="hidden lg:block">
        <Skeleton className="w-[30px] h-[30px]" />
      </div>

      {/* books */}
      <div className="hidden lg:block">
        <Skeleton className="w-[30px] h-[30px]" />
      </div>

      {/* how it works */}
      <div className="hidden lg:block">
        <Skeleton className="w-[30px] h-[30px]" />
      </div>

      <div className="flex items-center ml-auto gap-x-4">
        <div className="w-auto md:w-[200px]">
          <Skeleton className="w-full h-[30px]" />
        </div>

        <div className="hidden sm:block">
          <Skeleton className="w-[30px] h-[30px]" />
        </div>
        <Skeleton className="w-[30px] h-[30px]" />
        <div className="hidden sm:block">
          <Skeleton className="w-[30px] h-[30px]" />
        </div>
        <Skeleton className="w-[35px] h-[35px]" />
      </div>
    </div>
  );
};

export default PrivateNavSkeleton;
