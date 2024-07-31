import { getExamFiles } from "@/actions/get-exam-files";
import { getExamFolders } from "@/actions/get-exam-folders";
import { Suspense } from "react";
import DriveSearchInput from "../_components/drive-search-input";
import ExamFileList from "../_components/exam-components/exam-file-list";
import ExamFolderList from "../_components/exam-components/exam-folder-list";
import ExamBreadcrumb from "./_components/exam-breadcrumb";

const ExamLibraryPage = async () => {
  const folders = await getExamFolders();
  let files = await getExamFiles();

  return (
    <div className="p-4 space-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <DriveSearchInput pathname="/exam-library" />
      </Suspense>

      <div className="space-y-6 select-none">
        {/* breadcrumb */}
        <ExamBreadcrumb />

        {/* folders */}
        <ExamFolderList
          title="Folders"
          folders={folders}
          pageType="exam-library"
        />

        {/* files */}
        <ExamFileList title="Files" files={files} pageType="exam-library" />
      </div>
    </div>
  );
};

export default ExamLibraryPage;
