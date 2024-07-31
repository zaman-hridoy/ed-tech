"use client";

import { Button } from "@/components/ui/button";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa6";
import DriveFileNode from "./drive-file-node";

const DriveFolderNode = ({ id, name }: TreeNodeType) => {
  const { data } = useSession();
  const session = data as SessionWithUserType;

  const [open, setOpen] = useState(false);

  const folderState = useQuery({
    queryKey: [`drive-sub-folders_${id}`],
    queryFn: () =>
      axios
        .post("/dam/folder-service/subfolder-list/", {
          user_id: session.user?.userId,
          id: id,
        })
        .then((res) => {
          const list: TreeNodeType[] = res.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: "FOLDER",
            parentFolderId: null,
            createdAt: item.created_date,
            updatedAt: item.created_date,
            data: item,
          }));
          return list;
        }),
    enabled: open && !!session?.user?.userId,
  });

  const filesState = useQuery({
    queryKey: [`subfolder_files_${id}`],
    queryFn: () =>
      axios
        .post(`/dam/file-service/list`, {
          folder_id: id,
          user_id: session.user?.userId,
        })
        .then((res) => {
          const list: TreeNodeType[] = res.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: "FILE",
            parentFolderId: item.folder_id,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            data: item,
          }));
          return list;
        }),
    enabled: open && !!session?.user?.userId,
  });

  const loading = folderState.isLoading || folderState.isFetching;
  const folders = folderState.data || [];
  const files = filesState.data || [];
  return (
    <div>
      <div className="flex items-center space-x-2 hover:bg-slate-100 cursor-pointer py-[2px] rounded-md transition-all">
        <Button
          size="icon"
          className="shrink-0 w-auto h-auto py-1 text-slate-700 hover:bg-slate-200"
          variant="ghost"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
        {open ? (
          <FaFolderOpen className="shrink-0 text-sky-400" />
        ) : (
          <FaFolder className="shrink-0 text-sky-400" />
        )}
        <Link
          href={`/my-drive/${id}`}
          className="text-sm tracking-tight line-clamp-1 flex-1"
        >
          {name}
        </Link>
      </div>
      {open && (
        <div className="pl-6">
          {loading && <Loader2 className="animate-spin w-4 h-4" />}
          {!loading &&
            folders.map((item) => <DriveFolderNode key={item.id} {...item} />)}
          {!loading &&
            files.map((item) => <DriveFileNode key={item.id} {...item} />)}
        </div>
      )}
    </div>
  );
};

export default DriveFolderNode;
