"use client";

import CourseSectionTitle from "@/components/course-section-title";
import EmptySection from "@/components/empty-section";
import { Separator } from "@/components/ui/separator";
import { useGlobalStore } from "@/hooks/use-global-store";
import { useSticky } from "@/hooks/useSticky";
import { CourseDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import CourseListItem from "./course-list-item";

interface Props {
  courses: CourseDataType[];
}

const ActiveCourseList = ({ courses }: Props) => {
  const { isSticky } = useSticky(100);
  const { handleStoreActiveCourses } = useGlobalStore();
  // const session = data as SessionWithUserType;
  // const [courses, setCourses] = useState<CourseDataType[]>([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async function getCourses() {
    //   setLoading(true);
    //   if (session?.user?.type === "Student") {
    //     const list = await getStudentCourses(session);
    //     setCourses(list);
    //     handleStoreActiveCourses(list);
    //   } else if (
    //     session?.user?.type === "Educator" ||
    //     session?.user?.type === "ContentManager"
    //   ) {
    //     const course_list = await getEducatorCourses(session);
    //     const list = getCoursesByStatus(course_list, "active");
    //     setCourses(list);
    //   }
    //   setLoading(false);
    // }
    // if (session) {
    //   getCourses();
    // }

    if (courses.length > 0) {
      handleStoreActiveCourses(courses);
    }

    return () => {
      handleStoreActiveCourses([]);
    };
  }, [courses, handleStoreActiveCourses]);

  // if (loading) {
  //   return (
  //     <div className="mt-3 pr-4">
  //       <div className="space-y-2">
  //         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
  //           <Skeleton key={item} className="w-full h-10" />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      className={cn(
        "hidden xl:flex shrink-0 w-80 h-[90vh] bg-white rounded-md flex-col",
        isSticky && "sticky top-0 pt-20"
      )}
    >
      <div className="px-4 py-4 pb-2">
        <CourseSectionTitle title="Active courses" count={courses.length} />
      </div>
      <Separator className="my-2" />

      <div className="h-full overflow-y-auto no-scrollbar py-2">
        {courses.length === 0 && (
          <EmptySection
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6.4H4.8C5.01217 6.4 5.21566 6.31571 5.36569 6.16569C5.51571 6.01566 5.6 5.81217 5.6 5.6C5.6 5.38783 5.51571 5.18434 5.36569 5.03431C5.21566 4.88429 5.01217 4.8 4.8 4.8H4C3.78783 4.8 3.58434 4.88429 3.43431 5.03431C3.28429 5.18434 3.2 5.38783 3.2 5.6C3.2 5.81217 3.28429 6.01566 3.43431 6.16569C3.58434 6.31571 3.78783 6.4 4 6.4ZM7.2 11.2H4C3.78783 11.2 3.58434 11.2843 3.43431 11.4343C3.28429 11.5843 3.2 11.7878 3.2 12C3.2 12.2122 3.28429 12.4157 3.43431 12.5657C3.58434 12.7157 3.78783 12.8 4 12.8H7.2C7.41217 12.8 7.61566 12.7157 7.76569 12.5657C7.91571 12.4157 8 12.2122 8 12C8 11.7878 7.91571 11.5843 7.76569 11.4343C7.61566 11.2843 7.41217 11.2 7.2 11.2ZM7.2 8H4C3.78783 8 3.58434 8.08429 3.43431 8.23431C3.28429 8.38434 3.2 8.58783 3.2 8.8C3.2 9.01217 3.28429 9.21566 3.43431 9.36569C3.58434 9.51571 3.78783 9.6 4 9.6H7.2C7.41217 9.6 7.61566 9.51571 7.76569 9.36569C7.91571 9.21566 8 9.01217 8 8.8C8 8.58783 7.91571 8.38434 7.76569 8.23431C7.61566 8.08429 7.41217 8 7.2 8ZM12.736 5.904C12.7973 5.75831 12.814 5.59774 12.7841 5.44255C12.7542 5.28736 12.679 5.1445 12.568 5.032L7.768 0.232C7.70187 0.169773 7.62626 0.118465 7.544 0.0799999C7.52012 0.0766081 7.49588 0.0766081 7.472 0.0799999L7.248 0H2.4C1.76348 0 1.15303 0.252856 0.702944 0.702944C0.252856 1.15303 0 1.76348 0 2.4V13.6C0 14.2365 0.252856 14.847 0.702944 15.2971C1.15303 15.7471 1.76348 16 2.4 16H7.2C7.41217 16 7.61566 15.9157 7.76569 15.7657C7.91571 15.6157 8 15.4122 8 15.2C8 14.9878 7.91571 14.7843 7.76569 14.6343C7.61566 14.4843 7.41217 14.4 7.2 14.4H2.4C2.18783 14.4 1.98434 14.3157 1.83431 14.1657C1.68429 14.0157 1.6 13.8122 1.6 13.6V2.4C1.6 2.18783 1.68429 1.98434 1.83431 1.83431C1.98434 1.68429 2.18783 1.6 2.4 1.6H6.4V4C6.4 4.63652 6.65286 5.24697 7.10294 5.69706C7.55303 6.14714 8.16348 6.4 8.8 6.4H12C12.1579 6.39921 12.3121 6.35169 12.4431 6.26342C12.5741 6.17516 12.676 6.0501 12.736 5.904ZM8.8 4.8C8.58783 4.8 8.38434 4.71571 8.23431 4.56569C8.08429 4.41566 8 4.21217 8 4V2.728L10.072 4.8H8.8ZM14.4 8H10.4C10.1878 8 9.98434 8.08429 9.83432 8.23431C9.68429 8.38434 9.6 8.58783 9.6 8.8V15.2C9.60039 15.3447 9.64002 15.4866 9.71469 15.6106C9.78936 15.7346 9.89626 15.836 10.024 15.904C10.1491 15.9682 10.2889 15.9984 10.4294 15.9913C10.5698 15.9843 10.7059 15.9404 10.824 15.864L12.4 14.824L14 15.864C14.1195 15.9331 14.2549 15.9701 14.3929 15.9714C14.531 15.9727 14.667 15.9383 14.7878 15.8715C14.9086 15.8046 15.0101 15.7076 15.0823 15.59C15.1545 15.4723 15.1951 15.338 15.2 15.2V8.8C15.2 8.58783 15.1157 8.38434 14.9657 8.23431C14.8157 8.08429 14.6122 8 14.4 8ZM13.6 13.696L12.848 13.192C12.7157 13.1026 12.5597 13.0548 12.4 13.0548C12.2403 13.0548 12.0843 13.1026 11.952 13.192L11.2 13.696V9.6H13.6V13.696Z"
                  fill="#ccc"
                ></path>
              </svg>
            }
            emptyText="You don't have any active courses yet."
          />
        )}
        {courses.map((course) => (
          <CourseListItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default ActiveCourseList;
