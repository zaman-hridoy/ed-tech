import ActiveCourseBooks from "../_components/active-course-books";
import ProgramChart from "../_components/program-chart";
import PurchasedBooks from "../_components/purchased-books";

const StudentDashboardPage = () => {
  return (
    <main className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <ProgramChart />

        <div className="flex-auto">
          <PurchasedBooks />
        </div>
      </div>
      <ActiveCourseBooks />
    </main>
  );
};

export default StudentDashboardPage;
