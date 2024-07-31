import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { CourseDataType, SessionWithUserType } from "@/lib/types";
import { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";

type ReturnType = {
  course: CourseDataType;
  // isFollowing: boolean;
};

type HandleReturnType = (slug: string) => Promise<CourseDataType | null>;

export const getCourseBySlug: HandleReturnType = async (slug: string) => {
  const session: SessionWithUserType | null = await getServerSession(
    authOptions
  );

  if (!slug) return null;

  let course: CourseDataType | null = null;

  try {
    let res: AxiosResponse<any, any>;
    if (session) {
      res = await axios.get(`/content/courses/getCourseCollection/${slug}`, {
        headers: {
          Authorization: session?.user?.accessToken,
        },
      });
    } else {
      res = await axios.get(
        `/content/courses/getCourseCollectionPublic/${slug}`
      );
    }

    if (res.data?.success && res.data?.data && res?.data?.data?.length > 0) {
      // const activeCourse = res.data?.data?.find(
      //   (c: CourseDataType) => c.active_status
      // );
      // if (activeCourse) {
      //   // const isFollowing =
      //   //   res.data?.course_active_status &&
      //   //   res.data?.course_active_status?.some(
      //   //     (s: any) => s.student_id === session?.user?.userId
      //   //   );

      //   // return {
      //   //   course: activeCourse,
      //   //   isFollowing,
      //   // };

      //   course = activeCourse;
      // }
      course = res.data?.data[0];
    }
  } catch (error) {
    console.log(error);
  } finally {
    return course;
  }
};
