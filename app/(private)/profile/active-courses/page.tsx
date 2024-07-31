import { getEducatorCourses } from "@/actions/get-educator-courses";
import { getStudentCourses } from "@/actions/get-student-courses";
import CourseCard from "@/components/course-card";
import CourseSectionTitle from "@/components/course-section-title";
import { authOptions } from "@/lib/auth";
import { getCoursesByStatus } from "@/lib/helper-methods";
import { CourseDataType } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const ActiveCourses = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  let courses: CourseDataType[] = [];
  if (
    session?.user?.type === "Educator" ||
    session?.user?.type === "ContentManager"
  ) {
    const list = await getEducatorCourses(session);
    courses = getCoursesByStatus(list, "active");
  }
  if (session?.user?.type === "Student") {
    courses = await getStudentCourses(session);
  }

  return (
    <div className="w-full space-y-10">
      <div>
        <CourseSectionTitle title="Active courses" count={courses.length} />
        <div className="w-full grid grid-cols-1 gap-2  md:grid-cols-2 lg:grid-cols-3 mt-2">
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
