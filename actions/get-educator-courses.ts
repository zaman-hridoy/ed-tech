import axios from "@/lib/instance";
import { CourseDataType, SessionWithUserType } from "@/lib/types";

type HandleEducatorCouses = (
  session: SessionWithUserType
) => Promise<CourseDataType[]>;

export const getEducatorCourses: HandleEducatorCouses = async (session) => {
  let results: CourseDataType[] = [];
  try {
    const res = await axios.post(
      "/content/courses/getEducatorCourseCollections",
      {},
      {
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
      }
    );
    if (res?.data?.success && res?.data?.data && res?.data?.data?.length > 0) {
      results = res?.data?.data;
    }
    return [];
  } catch (error: any) {
    console.log(error?.response?.data);
  } finally {
    return results;
  }
};
