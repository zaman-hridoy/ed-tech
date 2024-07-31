import CourseSectionTitle from "@/components/course-section-title";
import CourseFileSkeleton from "@/components/skeletons/course-file-skeleton";
import CourseSkeleton from "@/components/skeletons/course-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 justify-between mb-2">
        <CourseSectionTitle title="Courses" count={0} />
        <Button variant="primary" className="gap-x-2" size="sm">
          <Plus className="w-4 h-4" /> Add Course
        </Button>
      </div>

      <div className="w-full grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
        {[...new Array(6)].map((_, idx) => (
          <CourseSkeleton key={idx} />
        ))}
      </div>

      <div className="space-y-4 mt-8">
        <CourseSectionTitle
          title="Featured Content"
          iconType="featured"
          count={0}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...new Array(6)].map((_, idx) => (
            <CourseFileSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
