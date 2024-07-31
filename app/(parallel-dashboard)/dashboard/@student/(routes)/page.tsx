import { getStudentCourses } from "@/actions/get-student-courses";
import CourseList from "@/components/course-list";
import CourseSectionTitle from "@/components/course-section-title";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import WelcomeArea from "../../@educator/_components/welcome-area";
import FeaturedContent from "../_components/featured-content";
import SelfAwareness from "../_components/self-awareness";

export const dynamic = "force-dynamic";

const StudentDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const course = await getStudentCourses(session);

  if (course.length === 0)
    return (
      <div className="mt-6 space-y-8">
        <WelcomeArea type={session.user?.type} />
        <SelfAwareness />
      </div>
    );

  return (
    <div className="mt-6 space-y-8">
      <div>
        <div className="flex items-center gap-4 justify-between">
          <CourseSectionTitle title="Courses" count={course.length} />
          <Button variant="primary" className="gap-x-2" size="sm">
            <Link href="/course/search" className="flex items-center gap-x-1">
              <Plus className="w-4 h-4" /> Add Course
            </Link>
          </Button>
        </div>

        <CourseList courses={course} />
      </div>

      <FeaturedContent />
      {/* <AnnotatedContents /> */}
      <SelfAwareness />
    </div>
  );
};

export default StudentDashboardPage;
