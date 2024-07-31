"use client";

import { CourseDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  course: CourseDataType;
}

const CourseListItem = ({ course }: Props) => {
  const params = useParams();
  return (
    <Link
      href={`/course/${course?.slug}`}
      className={cn(
        "text-base font-semibold tracking-tight text-slate-700 p-2 block hover:bg-slate-200 px-4 transition",
        params?.slug === course?.slug &&
          "bg-[var(--brand-color)] text-slate-100 hover:bg-[var(--brand-color)] hover:text-slate-100"
      )}
    >
      {course.collection_name}
    </Link>
  );
};

export default CourseListItem;
