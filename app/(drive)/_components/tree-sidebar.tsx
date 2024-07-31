import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import DriveTree from "./drive-components/drive-tree";
import ExamLibraryTree from "./exam-components/exam-library-tree";
import SharedByMeTree from "./exam-components/shared-by-me-tree";
import SharedWithMeTree from "./exam-components/shared-with-me-tree";

const TreeSidebar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="p-3 w-full overflow-y-auto space-y-4 no-scrollbar select-none">
      <DriveTree />
      {session.user?.type === "Student" && (
        <Fragment>
          <ExamLibraryTree />
          <SharedWithMeTree />
          <SharedByMeTree />
        </Fragment>
      )}
    </div>
  );
};

export default TreeSidebar;
