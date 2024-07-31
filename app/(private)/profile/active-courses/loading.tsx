import CourseSectionTitle from "@/components/course-section-title";
import CourseSkeleton from "@/components/skeletons/course-skeleton";

const LoadingPage = () => {
  return (
    <div className="w-full space-y-10">
      <div>
        <CourseSectionTitle title="Active courses" count={0} />
        <div className="w-full grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 mt-2">
          {[...new Array(6)].map((num, idx) => (
            <CourseSkeleton key={num} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
