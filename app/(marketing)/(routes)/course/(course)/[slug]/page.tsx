import { addCollectionViews } from "@/actions/add-collection-views";
import { getCourseBySlug } from "@/actions/get-course-by-slug";
import NotFound from "@/components/not-found";
import { CourseAccordion } from "../../_components/course-accordion";

const CourseViewPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const course = await getCourseBySlug(params.slug);

  // if (!courseData) return redirect(`/course/${params.slug}/not-found`);
  if (!course) {
    return <NotFound />;
  }

  await addCollectionViews(course?.id);

  return <CourseAccordion course={course} />;
};

export default CourseViewPage;
