"use client";

import CourseFileCard from "@/components/course-file-card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "@/lib/instance";
import { CourseFileType, TreeNodeType } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa6";

type BreadCrumb = {
  id: string;
  name: string;
};

const ExamLibraryTab = () => {
  const { data } = useSession();
  const [folderId, setFolderId] = useState<number>();
  const [breadcrumbList, setBreadcrumbList] = useState<BreadCrumb[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<TreeNodeType | null>(
    null
  );
  const [folders, setFolders] = useState<TreeNodeType[]>([]);
  const [files, setFiles] = useState<CourseFileType[]>([]);
  const [loading, setLoading] = useState(false);

  const getExamBreadCrumb = useCallback(
    (folderId: number) => {
      return axios
        .post(
          `/content/getBreadCrumbs`,
          {
            library_id: folderId,
          },
          {
            headers: {
              Authorization: data?.user?.accessToken,
            },
          }
        )
        .then((res) => {
          const list = res.data?.status?.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
          return list;
        });
    },
    [data]
  );

  const getExamFolders = useCallback(
    async (folderId?: number) => {
      try {
        setLoading(true);

        const payload = {
          student_id: data?.user?.userId,
          parent_id: folderId || null,
        };
        const folderRes = await axios.post(
          "/content/ExamLibraryList",
          payload,
          {
            headers: {
              Authorization: data?.user?.accessToken,
            },
          }
        );

        const filesPayload = {
          student_id: data?.user?.userId,
          exam_library_id: folderId || null,
        };

        const fileRes = await axios.post(
          "/content/ExamLibraryContentList",
          filesPayload,
          {
            headers: {
              Authorization: data?.user?.accessToken,
            },
          }
        );

        if (folderId) {
          const breadcrumbResult = await getExamBreadCrumb(folderId);
          setBreadcrumbList(breadcrumbResult);
        } else {
          setBreadcrumbList([]);
        }

        if (folderRes.data && folderRes.data?.status?.length > 0) {
          const results: TreeNodeType[] = folderRes.data?.status?.map(
            (item: any) => ({
              id: item.id,
              name: item.name,
              type: "FOLDER",
              parentFolderId: null,
              createdAt: item.created_date,
              updatedAt: item.created_date,
              data: item,
            })
          );
          setFolders(results);
        } else {
          setFolders([]);
        }

        // files
        const fileResults = fileRes.data?.status?.map((item: any) => {
          const content = JSON.parse(item?.content);
          return {
            id: item?.id,
            fileName: content?.fileName,
            url: content?.url,
            type: content?.type,
            fileExtention: content?.fileExtention,
            contentType: content?.contentType,
            premium: content?.premium,
            preview: content?.preview,
            duration: content?.duration,
            createdAt: content?.createdAt,
            from: content?.from,
            title: content?.title || "",
            description: content?.description || "",
            keywords: content?.keywords || "",
          };
        });
        setFiles(fileResults);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [data, getExamBreadCrumb]
  );

  useEffect(() => {
    getExamFolders();
  }, [getExamFolders]);

  return (
    <div className="h-[80vh] flex flex-col">
      <div className="flex items-center flex-wrap gap-2 px-4 py-2 border-b">
        <button
          onClick={() => getExamFolders()}
          className="text-sm tracking-tight font-semibold hover:underline text-slate-500 hover:text-slate-900 transition-colors"
        >
          Exam Library
        </button>
        {breadcrumbList.map((item) => (
          <Fragment key={item.id}>
            <ChevronRight className="w-4 h-4 text-inherit" />
            <button
              onClick={() => getExamFolders(+item.id)}
              className="text-sm tracking-tight font-semibold hover:underline text-slate-500 hover:text-slate-900 transition-colors"
            >
              {item.name}
            </button>
          </Fragment>
        ))}
      </div>
      <div className="h-full overflow-y-auto no-scrollbar px-4 py-2 rounded-md">
        <div className="grid grid-cols-2 gap-2">
          {loading ? (
            [...new Array(13)].map((num) => (
              <div
                key={num}
                className="bg-white shadow-sm shadow-[var(--brand-shadow)] rounded-lg cursor-pointer"
              >
                <div className="p-2 flex flex-col items-center gap-1">
                  <FaFolder className="shrink-0 w-8 h-8 text-sky-400" />
                  <Skeleton className="w-full h-4" />
                </div>
              </div>
            ))
          ) : (
            <>
              {files &&
                files.map((file) => (
                  <CourseFileCard key={file.id} file={file} />
                ))}

              {folders.map((folder) => (
                <button
                  key={folder.id}
                  className="bg-white shadow-md border shadow-[var(--brand-shadow)] rounded-lg cursor-pointer hover:bg-slate-50 transition"
                  onClick={() => {
                    setSelectedFolder(folder);
                    getExamFolders(folder.id);
                  }}
                >
                  <div className="p-2 flex flex-col items-center gap-1">
                    <FaFolder className="shrink-0 w-8 h-8 text-sky-400" />
                    <p className="text-xs flex-1 line-clamp-2">{folder.name}</p>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamLibraryTab;
