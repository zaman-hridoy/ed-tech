"use client";

import { getRecommenedContent } from "@/actions/get-recommended-content";
import CourseFileCard from "@/components/course-file-card";
import EmptySection from "@/components/empty-section";
import CourseFileSkeleton from "@/components/skeletons/course-file-skeleton";
import { useFilterResult } from "@/hooks/filter-search-results";
import { useCourseStore } from "@/hooks/use-course-store";
import { ChapterType, CourseFileType } from "@/lib/types";
import { useEffect, useState } from "react";

const RecommendTabContent = () => {
  const { collection } = useCourseStore();
  const [results, setResults] = useState<CourseFileType[]>([]);
  const [loading, setLoading] = useState(false);
  const chapters = collection.chapters || [];
  const activeChapter = chapters.find((chapter) => chapter.isActive) || null;

  useEffect(() => {
    async function getRecommened(active_chapter: ChapterType) {
      try {
        setLoading(true);
        const results = await getRecommenedContent(active_chapter.id);
        setResults(results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (activeChapter) {
      getRecommened(activeChapter);
    }
  }, [activeChapter]);

  const filtered = useFilterResult(results);

  return (
    <div className="overflow-y-auto h-full no-scrollbar">
      <div className="grid grid-cols-2 gap-2">
        {loading && (
          <>
            <div>
              <CourseFileSkeleton />
            </div>
            <div>
              <CourseFileSkeleton />
            </div>
          </>
        )}
        {!loading &&
          filtered.map((file) => <CourseFileCard key={file.id} file={file} />)}
      </div>
      {!loading && filtered.length === 0 && <EmptySection />}
    </div>
  );
};

export default RecommendTabContent;
