"use client";

import EmptySection from "@/components/empty-section";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getYoutubeVideoID } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { CourseFileType, TreeNodeType } from "@/lib/types";
import youtubeAPI from "@/lib/youtubeAPI";
import { Annotation } from "@prisma/client";
import { ChevronRight, Loader2 } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFolder } from "react-icons/fa6";
import { TbFolderSearch } from "react-icons/tb";
import ShortUniqueId from "short-unique-id";
import CreateExamFolder from "./create-exam-folder";

const uid = new ShortUniqueId();
type BreadCrumb = {
  id: string;
  name: string;
};

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  annotation: Annotation;
}

function SaveToExamModal({ isModalOpen, onClose, annotation }: Props) {
  const authSession = useSession();
  const session = authSession.data;
  const router = useRouter();

  const [breadcrumbList, setBreadcrumbList] = useState<BreadCrumb[]>([]);
  const [folders, setFolders] = useState<TreeNodeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<TreeNodeType | null>(
    null
  );

  // create modal
  const [openModal, setOpenModal] = useState(false);

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
    onClose();
  };

  const [saving, setSaving] = useState(false);
  const createExamContent = async () => {
    try {
      setSaving(true);
      const parentId = selectedFolder?.id || null;
      let content: CourseFileType | null = null;

      const youtubeId = getYoutubeVideoID(annotation.videoUrl);
      if (annotation.provider === "YOUTUBE" && youtubeId) {
        const res = await youtubeAPI.get("/videos", {
          params: {
            id: youtubeId,
            part: "contentDetails,snippet",
          },
        });
        if (res.data?.items?.length > 0) {
          const youtubeData = res.data?.items[0];
          content = {
            id: youtubeData?.id,
            fileName: youtubeData?.snippet?.title,
            url: annotation.videoUrl,
            type: "Core Concept",
            fileExtention: "mp4",
            contentType: "Video",
            premium: false,
            preview: youtubeData?.snippet?.thumbnails?.medium?.url,
            duration: `${moment
              .duration(youtubeData?.contentDetails?.duration)
              .asSeconds()}`,
            createdAt: new Date().toDateString(),
            from: "YOUTUBE",
            title: youtubeData?.snippet?.title,
            description: youtubeData?.snippet?.description,
            keywords: "",
            annotationId: annotation.id,
          };
        }
      } else {
        content = {
          id: uid.stamp(15),
          fileName: annotation.videoUrl,
          url: annotation.videoUrl,
          type: "Core Concept",
          fileExtention: "",
          contentType: "Blog",
          premium: false,
          preview: "",
          duration: "",
          createdAt: new Date().toDateString(),
          from: "EXTERNAL_URL",
          title: annotation.videoUrl,
          description: "",
          keywords: "",
          annotationId: annotation.id,
        };
      }

      const newData = {
        student_id: session?.user?.userId,
        exam_library_id: parentId,
        content: JSON.stringify(content),
        status: true,
      };

      await axios.post("/content/addExamLibraryContent", newData, {
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
      });

      toast.success("Content added successfully.");
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="sm:max-w-xl bg-white p-0 gap-0">
        <CreateExamFolder
          parentId={selectedFolder?.id || null}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={() => {
            if (selectedFolder) {
              getExamFolders(selectedFolder.id);
            } else {
              getExamFolders();
            }
          }}
        />
        <DialogHeader className="p-4">
          <DialogTitle>
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => getExamFolders()}
                className="text-sm tracking-tight font-semibold hover:underline text-slate-500 hover:text-slate-900 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
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
          <ScrollArea className="h-80 pr-2 py-2">
            {loading ? (
              <div className="flex flex-col h-20 items-center justify-center">
                <Loader2 className="w-10 h-10 text-[var(--brand-color)] animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
              </div>
            )}

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
              disabled={loading || saving}
              className="text-[var(--brand-color)] hover:text-[var(--brand-color)]"
              onClick={() => setOpenModal(true)}
            >
              Create new
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={loading}
              className="ml-auto"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              size="sm"
              variant="primary"
              disabled={loading || saving}
              className="gap-x-2"
              onClick={createExamContent}
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "Saving..." : "Save here"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SaveToExamModal;
