"use client";

import { CourseFileType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useCourseStore } from "./use-course-store";

export const useFilterResult = (results: CourseFileType[]) => {
  const { collection } = useCourseStore();
  const [filtered, setFiltered] = useState<CourseFileType[]>([...results]);

  useEffect(() => {
    const chapters = collection.chapters || [];
    const activeChapter = chapters.find((chapter) => chapter.isActive);

    if (results.length > 0 && activeChapter) {
      const items = results.filter((item) => {
        return !activeChapter.files.some((file) => file.id === item.id);
      });
      setFiltered(items);
    }
  }, [results, collection]);

  return filtered;
};
