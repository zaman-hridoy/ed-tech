"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-modal-store";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { ChevronRight, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiFolderOff } from "react-icons/ci";
import { FaFolder } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
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

function DriveMoveModal() {
  const authSession = useSession();
  const session = authSession.data as SessionWithUserType;
  const router = useRouter();

  const { isOpen, onModalClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "MOVE_DRIVE_FOLDER_AND_FILES";

  const [breadcrumbList, setBreadcrumbList] = useState<BreadCrumb[]>([]);
  const [folders, setFolders] = useState<TreeNodeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<TreeNodeType | null>(
    null
  );

  const getDriveFolders = useCallback(
    async (folderId?: number) => {
      let results: TreeNodeType[] = [];

      try {
        setLoading(true);
        const api = folderId
          ? "/dam/folder-service/subfolder-list"
          : "/dam/folder-service/list";

        const payload: PayloadType = {
          user_id: session?.user?.userId,
        };
        if (folderId) {
          payload.id = folderId;
        }
        const folderRes = await axios.post(api, payload);
        if (folderId) {
          const breadcrumbResult = await getDriveBreadCrumb(folderId);
          setBreadcrumbList(breadcrumbResult);
        } else {
          setBreadcrumbList([]);
        }

        if (folderRes.data && folderRes.data?.length > 0) {
          results = folderRes.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: "FOLDER",
            parentFolderId: item?.parent_folder_id || null,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            data: null,
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        const filterResults = results.filter(
          (folder) => folder.id !== data?.id
        );
        setFolders(filterResults);
      }
    },
    [session, data]
  );

  const getDriveBreadCrumb = (folderId: number) => {
    return axios
      .post(`/dam/folder-service/breadcrumbs`, {
        id: folderId,
      })
      .then((res) => {
        let breadcrumbData = [];
        for (let index = 0; index < res.data?.folderIDList.length; index++) {
          const obj = {
            name: res.data?.folderNameList[index],
            id: res.data?.folderIDList[index],
          };
          breadcrumbData.push(obj);
        }
        return breadcrumbData;
      });
  };

  useEffect(() => {
    if (isModalOpen) {
      getDriveFolders();
    }
  }, [getDriveFolders, isModalOpen]);

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
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="border-b pb-2">
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => getDriveFolders()}
                className="text-sm tracking-tight font-semibold hover:underline text-slate-500 hover:text-slate-900 transition-colors"
              >
                My Drive
              </button>
              {breadcrumbList.map((item) => (
                <Fragment key={item.id}>
                  <ChevronRight className="w-4 h-4 text-inherit" />
                  <button
                    onClick={() => getDriveFolders(+item.id)}
                    className="text-sm tracking-tight font-semibold hover:underline text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    {item.name}
                  </button>
                </Fragment>
              ))}
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="space-y-2">
              <h4 className="text-xs text-slate-400 tracking-tight">
                {data?.type === "FOLDER" ? "Folder to move" : "File to move"}
              </h4>
              <div className="flex items-center gap-1 w-fit">
                {data?.type === "FOLDER" ? (
                  <HiMiniFolderArrowDown className="shrink-0 w-4 h-4 text-sky-400" />
                ) : (
                  <FiFileText className="shrink-0 w-4 h-4 text-sky-400" />
                )}

                <p className="text-xs flex-1 line-clamp-2">{data?.name}</p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="h-72">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
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
                      getDriveFolders(folder.id);
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
                icon={<CiFolderOff className="w-12 h-12 text-slate-300" />}
                emptyText="Move here."
              />
            </div>
          )}
        </ScrollArea>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
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
            disabled={
              loading || moving || (!data?.parentFolderId && !selectedFolder)
            }
            className="gap-x-2"
            onClick={handleMove}
          >
            {moving && <Loader2 className="h-4 w-4 animate-spin" />}
            {moving ? "Moving..." : "Move"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DriveMoveModal;
