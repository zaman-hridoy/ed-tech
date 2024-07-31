import { getEducatorCourses } from "@/actions/get-educator-courses";
import CourseList from "@/components/course-list";
import CourseSectionTitle from "@/components/course-section-title";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getCoursesByStatus } from "@/lib/helper-methods";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import WelcomeArea from "../_components/welcome-area";

export const dynamic = "force-dynamic";

const EducatorDashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const course = await getEducatorCourses(session);
  const activeCourses = await getCoursesByStatus(course, "active");
  const draftCourses = await getCoursesByStatus(course, "draft");
  const completedCourses = await getCoursesByStatus(course, "completed");

  if (course.length === 0)
    return (
      <div>
        <div className="pt-8 pb-10">
          <WelcomeArea type="Educator" />
        </div>
      </div>
    );

  return (
    <div>
      <div className="pt-8 pb-10 space-y-0">
        {/* active */}
        <div>
          <div className="flex items-center gap-4 justify-between">
            <CourseSectionTitle
              title="Active courses"
              count={activeCourses.length}
            />
            <Button variant="primary" className="gap-x-2" asChild>
              <Link href="/course/collection-info">
                <Plus className="w-4 h-4" /> Create Course
              </Link>
            </Button>
          </div>

          <CourseList courses={activeCourses} />
        </div>

        {/* draft */}
        <div>
          <CourseSectionTitle
            title="Drat courses"
            count={activeCourses.length}
          />
          <CourseList courses={draftCourses} />
        </div>

        {/* completed */}
        <div>
          <CourseSectionTitle
            title="Completed courses"
            count={completedCourses.length}
          />

          <CourseList courses={completedCourses} />
        </div>
      </div>
    </div>
  );
};

export default EducatorDashboard;
