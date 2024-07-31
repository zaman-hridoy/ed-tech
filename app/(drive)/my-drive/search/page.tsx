"use client";

import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import DriveFileList from "../../_components/drive-components/drive-file-list";
import DriveFolderList from "../../_components/drive-components/drive-folder-list";
import DriveSearchInput from "../../_components/drive-search-input";
import FileLoadingSkeleton from "../../_components/file-loading-skeleton";
import FolderLoadingSkeleton from "../../_components/folder-loading-skeleton";

const DriveIdPage = () => {
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";
  const [folders, setFolders] = useState<TreeNodeType[]>([]);
  const [files, setFiles] = useState<TreeNodeType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`/dam/file-service/search`, {
        user_id: session?.user?.userId,
        text: query,
      })
      .then((res) => {
        const folderResults: any[] = res.data?.filter(
          (item: any) => !item.type
        );
        const fileResults: any[] = res.data?.filter((item: any) => !!item.type);
        const folder_list: TreeNodeType[] = folderResults.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: "FOLDER",
          parentFolderId: null,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          data: null,
        }));
        const file_list: TreeNodeType[] = fileResults.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: "FILE",
          parentFolderId: item.folder_id,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          data: item,
        }));
        setFolders(folder_list);
        setFiles(file_list);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, session]);

  return (
    <div className="p-4 space-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <DriveSearchInput pathname="/my-drive" />
      </Suspense>

      <h4 className="text-base text-slate-500 tracking-tight">
        Search results
      </h4>
      {loading ? (
        <div className="space-y-6 select-none">
          <div className="space-y-2">
            <h5 className="text-sm font-semibold text-slate-500">Folders</h5>

            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {[1, 2, 3].map((ele) => (
                <FolderLoadingSkeleton key={ele} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-semibold text-slate-500">Files</h5>

            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {[1, 2, 3, 4, 5, 6].map((ele) => (
                <FileLoadingSkeleton key={ele} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 select-none">
          {/* folders */}
          <DriveFolderList title="Files" folders={folders} />
          {/* files */}
          <DriveFileList title="Files" files={files} />
        </div>
      )}
    </div>
  );
};

export default DriveIdPage;
