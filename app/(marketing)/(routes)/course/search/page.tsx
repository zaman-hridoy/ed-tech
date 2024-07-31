import { getStudentCourses } from "@/actions/get-student-courses";
import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import { CourseDataType } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SearchResults from "./_components/search-results";

export const dynamic = "force-dynamic";

const CourseSearchPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  let courses: CourseDataType[] = [];
  if (session?.user?.type === "Student") {
    courses = await getStudentCourses(session);
  }

  return (
    <div className="h-full pt-16">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults activeCourses={courses} />
        </Suspense>
      </Container>
    </div>
  );
};

export default CourseSearchPage;
