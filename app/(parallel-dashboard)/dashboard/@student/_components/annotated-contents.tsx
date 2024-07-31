"use client";

import AnnotationContent from "@/components/annotation-content";
import CourseSectionTitle from "@/components/course-section-title";
import CourseFileSkeleton from "@/components/skeletons/course-file-skeleton";
import { Annotation } from "@prisma/client";
import axios from "axios";
import React, { Fragment, useState } from "react";

const AnnotatedContents = () => {
  const [contents, setContents] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function getAnnotatedContents() {
      try {
        setLoading(true);
        const res = await axios.get(`/api/annotations/list`);
        setContents(res.data);
      } catch (error: any) {
        console.log(error?.response?.data, "api - annotations/list ");
      } finally {
        setLoading(false);
      }
    }
    getAnnotatedContents();
  }, []);

  return (
    <div className="space-y-4">
      <CourseSectionTitle
        title="Annotated Contents"
        iconType="featured"
        count={contents.length}
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
            {contents.map((file) => (
              <AnnotationContent key={file.id} file={file} />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default AnnotatedContents;
