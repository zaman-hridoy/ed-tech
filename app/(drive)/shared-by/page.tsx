import { getSharedByFolders } from "@/actions/get-shared-by-folders";
import ExamFolderList from "../_components/exam-components/exam-folder-list";
import ExamBreadcrumb from "./_components/exam-breadcrumb";

const SharedWithPage = async () => {
  const folders = await getSharedByFolders();

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-6 select-none">
        {/* breadcrumb */}
        <ExamBreadcrumb />

        {/* folders */}
        <ExamFolderList
          title="Folders"
          folders={folders}
          pageType="shared-by"
        />
      </div>
    </div>
  );
};

export default SharedWithPage;
