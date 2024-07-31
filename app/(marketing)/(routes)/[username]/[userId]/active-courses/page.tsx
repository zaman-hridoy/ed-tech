import { getCoursesById } from "@/actions/get-courses-by-id";
import CourseCard from "@/components/course-card";
import CourseSectionTitle from "@/components/course-section-title";

const ActiveCourses = async ({
  params,
}: {
  params: { userId: string; username: string };
}) => {
  const courses = await getCoursesById(+params.userId);
  return (
    <div className="w-full space-y-10">
      <div>
        <CourseSectionTitle title="Active courses" count={courses.length} />
        <div className="w-full grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 mt-2">
          {courses &&
            courses.map((course, idx) => (
              <CourseCard
                key={course?.id}
                course={course}
                serial_number={idx + 1}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveCourses;
