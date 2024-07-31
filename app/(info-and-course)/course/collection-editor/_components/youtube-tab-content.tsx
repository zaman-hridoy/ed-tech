"use client";

import CourseFileCard from "@/components/course-file-card";
import EmptySection from "@/components/empty-section";
import CourseFileSkeleton from "@/components/skeletons/course-file-skeleton";
import { Input } from "@/components/ui/input";
import { useFilterResult } from "@/hooks/filter-search-results";
import { useDebounce } from "@/hooks/use-debounce";
import { CourseFileType } from "@/lib/types";
import youtubeAPI from "@/lib/youtubeAPI";
import { useEffect, useState } from "react";

const YoutubeTabContent = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [results, setResults] = useState<CourseFileType[]>([]);

  useEffect(() => {
    async function getSearchResult() {
      try {
        setLoading(true);
        const res = await youtubeAPI.get("/search", {
          params: {
            q: debounceValue,
            type: "video",
            part: "snippet",
          },
        });

        const result = res.data;
        if (result?.nextPageToken) {
          setNextPageToken(result?.nextPageToken);
        }
        const modifiedData: CourseFileType[] = result?.items?.map(
          (item: any) => ({
            id: item?.id?.videoId,
            fileName: item?.snippet?.title,
            url: `https://www.youtube.com/watch?v=${item?.id?.videoId}`,
            type: "Core Concept",
            fileExtention: "mp4",
            contentType: "Video",
            premium: false,
            preview: item?.snippet?.thumbnails?.medium?.url,
            duration: "",
            createdAt: new Date().toDateString(),
            from: "YOUTUBE",
            title: item?.snippet?.title,
            description: item?.snippet?.description,
            keywords: "",
          })
        );
        if (modifiedData.length > 0) {
          setResults(modifiedData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (debounceValue) {
      getSearchResult();
    }
  }, [debounceValue]);

  const filteredResults = useFilterResult(results);

  return (
    <div className="h-full flex flex-col">
      <Input
        placeholder="Search..."
        className="bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex-1 shrink-0 overflow-y-auto mt-1 no-scrollbar">
        <div className="grid  grid-cols-2 gap-1 gap-y-1">
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
          {filteredResults &&
            filteredResults.map((item) => (
              <div key={item.id}>
                <CourseFileCard file={item} />
              </div>
            ))}
        </div>
        {!loading && filteredResults.length === 0 && <EmptySection />}
      </div>
    </div>
  );
};

export default YoutubeTabContent;
