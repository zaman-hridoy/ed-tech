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
import ExamFileNode from "./exam-file-node";

const ExamFolderNode = ({
  id,
  name,
  pageType,
}: TreeNodeType & {
  pageType: "exam-library" | "shared-with" | "shared-by";
}) => {
  const { data } = useSession();
  const session = data as SessionWithUserType;

  const [open, setOpen] = useState(false);

  const folderState = useQuery({
    queryKey: [`exam-sub-folders_${id}`],
    queryFn: () =>
      axios
        .post(
          "/content/ExamLibraryList",
          {
            student_id: session.user?.userId,
            parent_id: id,
          },
          {
            headers: {
              Authorization: session.user?.accessToken,
            },
          }
        )
        .then((res) => {
          const list: TreeNodeType[] = res.data?.status?.map((item: any) => ({
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
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const fileState = useQuery({
    queryKey: [`exam-sub-files${id}`],
    queryFn: () =>
      axios
        .post(
          "/content/ExamLibraryContentList",
          {
            student_id: session.user?.userId,
            exam_library_id: id,
          },
          {
            headers: {
              Authorization: session.user?.accessToken,
            },
          }
        )
        .then((res) => {
          const list: TreeNodeType[] = res.data?.status?.map((item: any) => {
            const content = JSON.parse(item?.content);

            return {
              id: item.id,
              name: content.title || "no-filename",
              type: "FILE",
              parentFolderId: null,
              createdAt: item.created_date,
              updatedAt: item.created_date,
              data: content,
            };
          });
          return list;
        }),
    enabled: open && !!session?.user?.userId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const loading = folderState.isLoading || folderState.isFetching;
  const folders = folderState.data || [];
  const files = fileState.data || [];
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
          href={`/${pageType}/${id}`}
          className="text-sm tracking-tight line-clamp-1 flex-1"
        >
          {name}
        </Link>
      </div>
      {open && (
        <div className="pl-6 border-l">
          {loading && (
            <div className="flex items-center gap-x-2 text-xs tracking-tight text-slate-400">
              <Loader2 className="animate-spin w-4 h-4" /> Loading
            </div>
          )}
          {!loading &&
            folders.map((item) => (
              <ExamFolderNode key={item.id} {...item} pageType={pageType} />
            ))}
          {!loading &&
            files.map((item) => (
              <ExamFileNode key={item.id} {...item} pageType={pageType} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ExamFolderNode;
