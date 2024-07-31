import CourseSectionTitle from "@/components/course-section-title";
import CourseSkeleton from "@/components/skeletons/course-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="px-4 lg:px-6 pt-8 pb-10 space-y-14">
      <div>
        <div className="flex items-center gap-4 justify-between mb-2">
          <CourseSectionTitle title="Courses" count={0} />
          <Button variant="primary" className="gap-x-2" size="sm" disabled>
            <Plus className="w-4 h-4" /> Create Course
          </Button>
        </div>

        <div className="w-full grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
          {[...new Array(6)].map((num) => (
            <CourseSkeleton key={num} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 justify-between mb-2">
          <CourseSectionTitle title="Draft Courses" count={0} />
        </div>

        <div className="w-full grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
          {[...new Array(6)].map((num) => (
            <CourseSkeleton key={num} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 justify-between mb-2">
          <CourseSectionTitle title="Completed Courses" count={0} />
        </div>

        <div className="w-full grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
          {[...new Array(6)].map((num) => (
            <CourseSkeleton key={num} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
