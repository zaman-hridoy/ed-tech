"use client";

import CourseCard from "@/components/course-card";
import { CourseDataType } from "@/lib/types";
import { useState } from "react";

interface Props {
  courses: CourseDataType[];
  initialViewCount?: number;
}

const CourseList = ({ courses, initialViewCount = 6 }: Props) => {
  // const alanBtnRef = useRef<any>({}).current;
  // useEffect(() => {
  //   alanBtnRef.btnInstance = alanBtn({
  //     key: "6b3372ded3eee8b7191b64067b98322c2e956eca572e1d8b807a3e2338fdd0dc/stage",
  //   });
  // }, [alanBtnRef]);

  // useEffect(() => {
  //   alanBtnRef.btnInstance.playText(
  //     "Here is your dashbord. You can view your active courses here."
  //   );
  //   alanBtnRef.btnInstance.setVisualState({
  //     data: courses.map((c) => ({ id: c.id, name: c.collection_name })),
  //     screen: "student dashboard",
  //   });
  // }, [alanBtnRef, courses]);

  //   const [initialList, setInitialList] = useState<CourseDataType[]>([]);
  const [viewedAll, setViewedAll] = useState(false);

  //   useEffect(() => {
  //     if (courses.length > initialViewCount) {
  //       setInitialList(courses.slice(0, initialViewCount));
  //     }
  //   }, [courses, initialViewCount]);

  const list = viewedAll
    ? [...courses]
    : [...courses].splice(0, initialViewCount);

  return (
    <div>
      <div className="w-full grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 mt-2">
        {list &&
          list.map((course, idx) => (
            <CourseCard
              key={course?.id}
              course={course}
              serial_number={idx + 1}
            />
          ))}
      </div>
      {courses.length > initialViewCount && !viewedAll && (
        <div className="text-right mt-2">
          <button
            onClick={() => setViewedAll(true)}
            className="text-sm tracking-tight font-semibold text-[var(--brand-color)] hover:text-[var(--brand-color)] hover:underline"
          >
            View all
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
