import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseDataType } from "@/lib/types";
import Link from "next/link";
import { Fragment } from "react";
import AccordionChapterHeader from "./accordion-chapter-header";
import AccordionDetailsHeader from "./accordion-details-header";
import AssociateBooks from "./associate-books";
import CourseFiles from "./course-files";
import EducatorSection from "./educator-section";
import RatingSection from "./rating-section";
import ViewsSection from "./views-section";

export const dynamic = "force-dynamic";

interface Props {
  course: CourseDataType;
}

export async function CourseAccordion({ course }: Props) {
  const firstChapter = course.chapter_content_mapping[0];
  return (
    <Fragment>
      <Accordion
        type="multiple"
        defaultValue={["details", `${firstChapter?.id}`]}
        className="w-full"
      >
        <AccordionItem
          value="details"
          className="rounded-md bg-white shadow-sm"
        >
          <AccordionContent>
            <AccordionDetailsHeader course={course} />
            <div className="p-4 flex flex-col w-full justify-between lg:flex-row gap-32">
              <div className="space-y-8">
                {/* title */}
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-semibold tracking-tight">
                    Title
                  </span>
                  <h2 className="text-base text-[var(--brand-color)] font-semibold tracking-tight">
                    {course.collection_name}
                  </h2>
                </div>

                {/* description */}
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-semibold tracking-tight">
                    Descripton
                  </span>
                  <p className="text-base text-slate-600 font-semibold tracking-tight">
                    {course.collection_description}
                  </p>
                </div>

                {/* Associated */}
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-semibold tracking-tight">
                    Associated Course
                  </span>
                  <h2 className="text-base text-slate-900 font-semibold tracking-tight">
                    {course.course_name}
                  </h2>
                </div>

                {/* Associated books */}
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-semibold tracking-tight">
                    Associated Books
                  </span>
                  <AssociateBooks course={course} />
                </div>
              </div>
              <div className="flex flex-col items-end space-y-5 text-right">
                <EducatorSection educatorId={course.educator_id} />

                <RatingSection collectionId={course.id} />

                <ViewsSection collectionId={course.id} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        {course.chapter_content_mapping &&
          course.chapter_content_mapping.map((chapter) => (
            <AccordionItem
              key={chapter.id}
              value={`${chapter.id}`}
              className="rounded-md bg-white shadow-sm mt-2"
            >
              <AccordionTrigger>
                <AccordionChapterHeader
                  chapterName={chapter.chapterName}
                  files_count={chapter?.files?.length || 0}
                />
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-900 tracking-tight font-semibold">
                      Uploaded by{" "}
                      <Link
                        href="#"
                        className="text-[var(--brand-color)] hover:underline"
                      >
                        {course.educator_name}
                      </Link>
                    </span>
                    <span className="text-sm text-slate-900 tracking-tight font-semibold">
                      Book:{" "}
                      <Link
                        href="#"
                        className="text-[var(--brand-color)] hover:underline"
                      >
                        {chapter.bookName}
                      </Link>
                    </span>
                  </div>

                  {/* files */}
                  <CourseFiles
                    files={chapter.files}
                    educatorId={course.educator_id}
                    courseId={course.id}
                    chapterId={chapter.id}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </Fragment>
  );
}
