import { Skeleton } from "@/components/ui/skeleton";

const CoursePageLoading = () => {
  return (
    <div className="flex flex-col gap-y-4 h-full">
      <Skeleton className="w-full h-[50px] bg-slate-200" />
      <Skeleton className="w-full h-[50vh] bg-slate-200" />
      <Skeleton className="w-full h-[40vh] bg-slate-200" />
    </div>
  );
};

export default CoursePageLoading;
