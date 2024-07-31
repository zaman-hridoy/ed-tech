import axios from "@/lib/instance";
import { CourseDataType, SessionWithUserType } from "@/lib/types";

type HandleStudentCouses = (
  session: SessionWithUserType,
  status?: "active" | "complete"
) => Promise<CourseDataType[]>;

export const getStudentCourses: HandleStudentCouses = async (
  session,
  status = "active"
) => {
  let results: CourseDataType[] = [];
  try {
    const res = await axios.post(
      `/content/courses/getStudentCourseListByStatus/${session?.user?.userId}`,
      {
        student_id: session?.user?.userId,
        status,
      },
      {
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
      }
    );
    if (res?.data?.request && res?.data?.request?.length > 0) {
      const updatedCourses = res?.data?.request.map((course: any) => ({
        ...course,
        id: course?.course_collection_id || course?.id,
      }));
      results = updatedCourses;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return results;
  }
};
