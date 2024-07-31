"use client";

import CourseFileCard from "@/components/course-file-card";
import CourseSectionTitle from "@/components/course-section-title";
import CourseFileSkeleton from "@/components/skeletons/course-file-skeleton";
import axios from "@/lib/instance";
import { CourseFileType } from "@/lib/types";
import { useSession } from "next-auth/react";
import React, { Fragment, useState } from "react";

const FeaturedContent = () => {
  const session = useSession();
  const [featuredContents, setFeaturedContents] = useState<CourseFileType[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function getFeaturedContents() {
      try {
        setLoading(true);
        const res = await axios.get(
          `/content/courses/getStudentFeatureCourseCollectionItem/${session?.data?.user?.userId}`
          // {
          //   headers: {
          //     Authorization: `${token}`,
          //   },
          // }
        );

        if (res.data?.features && res.data?.features?.length > 0) {
          let recommendedFiles: any = [];
          res.data?.features.forEach((cl: any) => {
            const activeChapter = cl?.chapter_content_mapping[0];
            if (activeChapter) {
              if (activeChapter?.urls && activeChapter?.urls?.length > 0) {
                recommendedFiles = [
                  ...recommendedFiles,
                  ...activeChapter?.files,
                  ...activeChapter?.urls,
                ];
              } else {
                recommendedFiles = [
                  ...recommendedFiles,
                  ...activeChapter?.files,
                ];
              }
            }
          });

          //   const filtered = recommendedFiles.filter(
          //     (f: any) => f.contentType === "Video"
          //   );
          let uniqueArr: any[] = [];
          recommendedFiles.forEach((file: any) => {
            const isDuplicate = uniqueArr.some(
              (f: any) => f?.url === file?.url
            );

            if (!isDuplicate) {
              uniqueArr.push(file);
            }
          });

          const allFiles = uniqueArr
            .map((file) => ({
              ...file,
              from: file.from === "URL" ? "YOUTUBE" : file.from,
            }))
            .slice(0, 10);

          setFeaturedContents(allFiles);
        }
      } catch (error: any) {
        console.log(
          error?.response?.data,
          "api - getStudentFeatureCourseCollectionItem "
        );
      } finally {
        setLoading(false);
      }
    }
    if (session?.data?.user?.userId) {
      getFeaturedContents();
    }
  }, [session]);

  return (
    <div className="space-y-4">
      <CourseSectionTitle
        title="Featured Content"
        iconType="featured"
        count={featuredContents.length}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading ? (
          <Fragment>
            {[...new Array(10)].map((num) => (
              <CourseFileSkeleton key={num} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {featuredContents.map((file) => (
              <CourseFileCard key={file.id} file={file} enableDrag={false} />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default FeaturedContent;
