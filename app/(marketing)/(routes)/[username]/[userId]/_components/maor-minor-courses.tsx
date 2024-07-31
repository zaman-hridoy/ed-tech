interface Props {
  title: string;
  courses: string | null;
}

const MajorMinorCourses = ({ title, courses }: Props) => {
  const courseList: any[] = courses ? JSON.parse(courses) : [];

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-xs text-slate-500 tracking-tight">{title}</span>
      <div className="flex flex-col gap-y-2 items-start">
        {courseList && courseList?.length > 0 ? (
          courseList?.map((course) => (
            <h4
              key={course.id}
              className="text-slate-900 text-sm bg-slate-200 inline-block px-2 py-[3px] rounded-full lowercase"
            >
              {course.name || course?.course_name}
            </h4>
          ))
        ) : (
          <p className="text-slate-500 italic text-xs bg-slate-200 inline-block px-2 py-[3px] rounded-full">
            No courses added.
          </p>
        )}
      </div>
    </div>
  );
};

export default MajorMinorCourses;
