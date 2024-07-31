import axios from "@/lib/instance";
import { CourseDataType, CourseFileType } from "@/lib/types";

export async function getRecommenedContent(chapterId: string) {
  const uniqueFiles: CourseFileType[] = [];
  const res = await axios.post("/content/courses/getrecomendedCourseChapters", {
    chapter_id: chapterId,
  });
  if (res.data?.success && res.data?.data?.length > 0) {
    const courses: CourseDataType[] = res.data?.data || [];
    const allfiles: CourseFileType[] = [];
    courses.forEach((course) => {
      const target_chapter = course.chapter_content_mapping.find(
        (chapter) => `${chapter.id}` === `${chapterId}`
      );
      if (target_chapter?.files && target_chapter.files?.length > 0) {
        allfiles.push(...target_chapter.files);
      }
    });

    allfiles.forEach((file) => {
      const isTaken = uniqueFiles.some((f) => f.id === file.id);
      if (!isTaken) {
        uniqueFiles.push(file);
      }
    });
  }

  return uniqueFiles;
}
