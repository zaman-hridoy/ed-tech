import { getExamFiles } from "@/actions/get-exam-files";
import { getExamFolders } from "@/actions/get-exam-folders";
import ExamFileList from "../../_components/exam-components/exam-file-list";
import ExamFolderList from "../../_components/exam-components/exam-folder-list";
import ExamBreadcrumb from "../_components/exam-breadcrumb";

const FolderIdPage = async ({
  params,
}: {
  params: {
    folderId: string;
  };
}) => {
  const folders = await getExamFolders(+params.folderId);
  let files = await getExamFiles(+params.folderId);

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-6 select-none">
        {/* breadcrumb */}
        <ExamBreadcrumb folderId={params.folderId} />

        {/* folders */}
        <ExamFolderList
          title="Folders"
          folders={folders}
          pageType="shared-with"
        />

        {/* files */}
        <ExamFileList title="Files" files={files} pageType="shared-by" />
      </div>
    </div>
  );
};

export default FolderIdPage;
