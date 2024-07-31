import axios from "@/lib/instance";
import { CourseDataType } from "@/lib/types";

export const getCoursesById = async (
  userId: number,
  offset = 0,
  limit = 24
) => {
  let results: CourseDataType[] = [];
  try {
    const res = await axios.post(
      `/content/courses/getCourseCollectionsPublic`,
      {
        limit: limit,
        offset: offset,
        user_id: userId,
      }
    );
    console.log(res.data, { userId });
    if (res?.data?.courses && res?.data?.courses?.length > 0) {
      results = res?.data?.courses;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return results;
  }
};
