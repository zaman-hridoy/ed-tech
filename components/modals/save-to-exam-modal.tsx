"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-modal-store";
import axios from "@/lib/instance";
import { TreeNodeType } from "@/lib/types";
import { ChevronRight, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFolder } from "react-icons/fa6";
import { TbFolderSearch } from "react-icons/tb";
import EmptySection from "../empty-section";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

type PayloadType = {
  id?: number;
  user_id?: number;
};

type BreadCrumb = {
  id: string;
  name: string;
};

function SaveToExamModal() {
  const authSession = useSession();
  const session = authSession.data;
  const router = useRouter();

  const { isOpen, onModalClose, type, data, onModalOpen } = useModal();
  const isModalOpen = isOpen && type === "SAVE_TO_EXAM_LIBRARY";

  const [breadcrumbList, setBreadcrumbList] = useState<BreadCrumb[]>([]);
  const [folders, setFolders] = useState<TreeNodeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<TreeNodeType | null>(
    null
  );

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
              Authorization: session?.user?.accessToken,
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
    [session]
  );

  const getExamFolders = useCallback(
    async (folderId?: number) => {
      try {
        setLoading(true);

        const payload = {
          student_id: session?.user?.userId,
          parent_id: folderId || null,
        };
        const folderRes = await axios.post(
          "/content/ExamLibraryList",
          payload,
          {
            headers: {
              Authorization: session?.user?.accessToken,
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
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [session, getExamBreadCrumb]
  );

  useEffect(() => {
    if (isModalOpen) {
      getExamFolders();
    }
  }, [getExamFolders, isModalOpen]);

  const handleClose = () => {
    setSelectedFolder(null);
    setFolders([]);
    onModalClose();
  };

  const [moving, setMoving] = useState(false);
  const handleMove = async () => {
    const type = `${data?.type}`.toLowerCase();
    setMoving(true);
    try {
      await axios.patch(`/dam/${type}-service/move/`, {
        id: data?.id,
        parent: selectedFolder?.id || null,
        user_id: session?.user?.userId,
      });
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setMoving(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl bg-white p-0 gap-0">
        <DialogHeader className="p-4">
          <DialogTitle>
            <div className="flex items-center flex-wrap gap-2">
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
          </DialogTitle>
        </DialogHeader>
        <Separator className="mb-2" />
        <div className="px-4 pr-2">
          <ScrollArea className="h-80 pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                        <p className="text-xs flex-1 line-clamp-2">
                          {folder.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>
            {!loading && folders.length === 0 && (
              <div className="flex items-center justify-center w-full h-72">
                <EmptySection
                  icon={<TbFolderSearch className="w-12 h-12 text-slate-300" />}
                  emptyText="Save here."
                />
              </div>
            )}
          </ScrollArea>
        </div>
        <DialogFooter className="sm:justify-normal bg-slate-100 p-4">
          <div className="flex items-center gap-x-2 w-full">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={loading || moving}
              className="text-[var(--brand-color)] hover:text-[var(--brand-color)]"
              onClick={() =>
                onModalOpen("CREATE_EXAM_FOLDER", {
                  parentId: selectedFolder?.id || null,
                })
              }
            >
              Create new
            </Button>
            <DialogClose asChild className="ml-auto">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={loading || moving}
              >
                Close
              </Button>
            </DialogClose>
            <Button
              size="sm"
              variant="primary"
              disabled={loading || moving || !selectedFolder}
              className="gap-x-2"
              onClick={handleMove}
            >
              {moving && <Loader2 className="h-4 w-4 animate-spin" />}
              {moving ? "Saving..." : "Save here"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SaveToExamModal;
