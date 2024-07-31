"use client";

import { Separator } from "@/components/ui/separator";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ExamFolderNode from "./exam-folder-node";

const SharedByMeTree = () => {
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const folderState = useQuery({
    queryKey: ["share-by-me-parent-folders"],
    queryFn: () =>
      axios
        .post(
          "/content/getshareExamLibraryByMe",
          {
            sender_student_id: session.user?.userId,
          },
          {
            headers: {
              Authorization: session.user?.accessToken,
            },
          }
        )
        .then((res) => {
          const list: TreeNodeType[] = res.data?.status?.map((item: any) => ({
            id: item.library_id,
            name: item.examlibrary_name,
            type: "FOLDER",
            parentFolderId: null,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            data: item,
          }));
          return list;
        }),
    enabled: !!session?.user?.userId,
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-x-2 text-sm font-semibold tracking-tight w-full text-slate-500 hover:text-[var(--brand-color)]">
        <Share2 className="w-4 h-4 text-inherit" />
        <Link href="/shared-by" className="text-inherit hover:underline">
          Shared by me
        </Link>
      </div>
      <Separator className="my-2 w-full" />
      <div className="flex flex-col">
        {folderState.data &&
          folderState.data.map((folder) => (
            <ExamFolderNode key={folder.id} {...folder} pageType="shared-by" />
          ))}
      </div>
    </div>
  );
};

export default SharedByMeTree;
