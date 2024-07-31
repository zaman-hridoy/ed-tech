import { getEducatorCourses } from "@/actions/get-educator-courses";
import { getStudentCourses } from "@/actions/get-student-courses";
import { authOptions } from "@/lib/auth";
import { getCoursesByStatus } from "@/lib/helper-methods";
import { CourseDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import React from "react";
import ActiveCourseList from "../_components/active-course-list";
import DndContextProvider from "../_components/dnd-context-provider";
import { StudentDriveSection } from "../_components/student-drive-section";

export const dynamic = "force-dynamic";

const CourseLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  // if (!session) return redirect("/");
  let courses: CourseDataType[] = [];
  if (session?.user?.type === "Student") {
    courses = await getStudentCourses(session);
  } else if (
    session?.user?.type === "Educator" ||
    session?.user?.type === "ContentManager"
  ) {
    const course_list = await getEducatorCourses(session);
    courses = getCoursesByStatus(course_list, "active");
  }

  return (
    <DndContextProvider>
      <div
        className={cn(
          "mt-6 flex items-start gap-2 pb-10 h-full pt-16",
          !session && "max-w-5xl mx-auto"
        )}
      >
        {session && <ActiveCourseList courses={courses} />}

        <div className="flex-auto">{children}</div>

        {(session?.user?.type === "Educator" ||
          session?.user?.type === "ContentManager") && (
          <div className="hidden xl:block w-96 shrink-0"></div>
        )}

        {session?.user?.type === "Student" && <StudentDriveSection />}
      </div>
    </DndContextProvider>
  );
};

export default CourseLayout;
