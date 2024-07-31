import { CourseDataType } from "@/lib/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StoreType {
  followedCourses: CourseDataType[];
  handleStoreActiveCourses: (courses: CourseDataType[]) => void;
}

export const useGlobalStore = create<StoreType>()(
  devtools(
    (set) => ({
      followedCourses: [],
      handleStoreActiveCourses: (courses) =>
        set(() => ({ followedCourses: courses })),
    }),
    {
      name: "st-global-store",
    }
  )
);
