import { getDriveFiles } from "@/actions/get-drive-files";
import { getDriveFolders } from "@/actions/get-drive-folders";
import { getDriveRecentFiles } from "@/actions/get-drive-recent-files";
import { Suspense } from "react";
import DriveFileList from "../_components/drive-components/drive-file-list";
import DriveFolderList from "../_components/drive-components/drive-folder-list";
import DriveSearchInput from "../_components/drive-search-input";
import DriveBreadcrumb from "./_components/drive-breadcrumb";

const MyDrivePage = async () => {
  const recentFiles = await getDriveRecentFiles();
  const folders = await getDriveFolders();
  let files = await getDriveFiles();

  return (
    <div className="p-4 space-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <DriveSearchInput pathname="/my-drive" />
      </Suspense>

      <div className="space-y-6 select-none">
        {/* breadcrumb */}
        <DriveBreadcrumb />

        {/* recent */}
        <DriveFileList title="Recent" files={recentFiles} recent={true} />

        {/* folders */}
        <DriveFolderList title="Folders" folders={folders} />

        {/* files */}
        <DriveFileList title="Files" files={files} />
      </div>
    </div>
  );
};

export default MyDrivePage;
