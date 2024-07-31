import { getDriveFiles } from "@/actions/get-drive-files";
import { getDriveFolders } from "@/actions/get-drive-folders";
import { Suspense } from "react";
import DriveFileList from "../../_components/drive-components/drive-file-list";
import DriveFolderList from "../../_components/drive-components/drive-folder-list";
import DriveSearchInput from "../../_components/drive-search-input";
import DriveBreadcrumb from "../_components/drive-breadcrumb";

const DriveIdPage = async ({
  params,
}: {
  params: {
    folderId: string;
  };
}) => {
  const folders = await getDriveFolders(+params.folderId);
  let files = await getDriveFiles(+params.folderId);

  return (
    <div className="p-4 space-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <DriveSearchInput pathname="/my-drive" />
      </Suspense>

      <div className="space-y-6 select-none">
        {/* breadcrumb */}
        <DriveBreadcrumb folderId={params.folderId} />

        {/* folders */}
        <DriveFolderList title="Folders" folders={folders} />

        {/* files */}
        <DriveFileList title="Files" files={files} />
      </div>
    </div>
  );
};

export default DriveIdPage;
