"use client";

import CourseCard from "@/components/course-card";
import CourseSkeleton from "@/components/skeletons/course-skeleton";
import { useGlobalStore } from "@/hooks/use-global-store";
import { useSticky } from "@/hooks/useSticky";
import axios from "@/lib/instance";
import { CourseDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import SearchInput from "./search-input";

interface Props {
  activeCourses: CourseDataType[];
}

const SearchResults = ({ activeCourses }: Props) => {
  const session = useSession();
  const { isSticky } = useSticky();
  const resultRef = useRef<HTMLDivElement>(null);
  const { handleStoreActiveCourses, followedCourses } = useGlobalStore();
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "a";
  useEffect(() => {
    handleStoreActiveCourses(activeCourses);

    return () => {
      handleStoreActiveCourses([]);
    };
  }, [activeCourses, handleStoreActiveCourses]);

  const [results, setResults] = useState<CourseDataType[]>([]);
  const [total, setTotal] = useState(0);
  const [collegeName, setCollegeName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/content/courses/getCourseCollections/${18}/0/${query}`,
          {
            headers: {
              Authorization: session?.data?.user?.accessToken,
            },
          }
        );

        if (res.data.success) {
          setResults(res.data?.courses);
          setTotal(+res.data?.total);
          setCollegeName(res.data?.collegeName);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [query, session]);

  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const loadMoreData = async (offset: number) => {
    try {
      setLoadMoreLoading(true);
      const res = await axios.get(
        `/content/courses/getCourseCollections/${9}/${offset}/${query}`,
        {
          headers: {
            Authorization: session?.data?.user?.accessToken,
          },
        }
      );

      if (res.data.success) {
        setResults((prev) => [...prev, ...res.data?.courses]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  const isFollowingCourse = (course: CourseDataType) => {
    const status = followedCourses.some((c) => c.id === course.id);
    return status ? true : false;
  };

  return (
    <div ref={resultRef} className="min-h-[60vh]">
      <h1 className="text-2xl font-medium mb-2">Search and Add Course</h1>
      <div
        className={cn(
          isSticky && "sticky top-16 bg-[#F6F6FF] pb-4 z-20 rounded-md"
        )}
      >
        <SearchInput />
        <p className="text-sm md:text-base font-medium text-zinc-500 mt-4">
          Showing results {results.length} - {total} for ({collegeName})
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4 gap-4">
          {[...new Array(12)].map((num) => (
            <CourseSkeleton key={num} />
          ))}
        </div>
      ) : (
        <Fragment>
          <InfiniteScroll
            loadMore={() => {
              if (!loadMoreLoading) {
                loadMoreData(results.length);
                console.log("load");
              }
            }}
            hasMore={results.length < total}
            loader={
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4 gap-4">
                {[...new Array(3)].map((num) => (
                  <CourseSkeleton key={num} />
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4 gap-4">
              {results.map((course, idx) => (
                <CourseCard
                  key={course.id}
                  serial_number={idx + 1}
                  course={course}
                  showActiveBadge={() => isFollowingCourse(course)}
                />
              ))}
            </div>
          </InfiniteScroll>
        </Fragment>
      )}
    </div>
  );
};

export default SearchResults;
