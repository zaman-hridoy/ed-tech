import CourseFileCard from "@/components/course-file-card";
import { CourseFileType } from "@/lib/types";

interface Props {
  files: CourseFileType[];
  educatorId: number;
  courseId: number;
  chapterId: number;
}

const CourseFiles = ({ files, educatorId, courseId, chapterId }: Props) => {
  return (
    <div className="max-h-[350px] pr-3 mt-8 overflow-y-auto no-scrollbar">
      <div className="grid grid-cols-3 gap-3">
        {files.map((file) => (
          <CourseFileCard
            key={file.id}
            file={file}
            educatorId={educatorId}
            courseId={courseId}
            chapterId={chapterId}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseFiles;
