import { getEducatorCourses } from "@/actions/get-educator-courses";
import CourseCard from "@/components/course-card";
import CourseSectionTitle from "@/components/course-section-title";
import { authOptions } from "@/lib/auth";
import { getCoursesByStatus } from "@/lib/helper-methods";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const ActiveCourses = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const courses = await getEducatorCourses(session);

  const draftCourses = getCoursesByStatus(courses, "draft");

  return (
    <div className="w-full space-y-10">
      <div>
        <CourseSectionTitle
          title="Draft courses"
          count={draftCourses.length}
          iconColor="var(--brand-color-alert)"
        />
        <div className="w-full grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 mt-2">
          {draftCourses &&
            draftCourses.map((course, idx) => (
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
