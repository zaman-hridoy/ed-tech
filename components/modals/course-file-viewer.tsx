"use client";

import { getProfileById } from "@/actions/get-profile-by-id";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import axios from "@/lib/instance";
import {
  CourseFileType,
  SessionWithUserType,
  UserProfileType,
} from "@/lib/types";
import { format } from "date-fns";

import { Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import dynamic from "next/dynamic";
import Link from "next/link";
import DocxViewer from "../file-renderer/docx-viewer";
import RatingInput from "../rating-input";
import ReadMoreText from "../read-more-text";
import { Separator } from "../ui/separator";
import UserAvatar from "../user-avatar";
import CourseFileComments from "./_components/course-file-comments";

const AudioPlayer = dynamic(() => import("../audio-player"), { ssr: false });
const VideoPlayer = dynamic(() => import("@/components/video-player"), {
  ssr: false,
});

// const imageMimeTypes = ["Image"];
// const videoMimeTypes = ["Video"];
// const audioMimeTypes = ["Audio"];
// const docsMimeType = [
//   "Document",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// ];

export function CourseFileViewer() {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;

  const router = useRouter();
  const modal = useModal();
  const file: CourseFileType = modal.data?.file || null;
  const educatorId = modal.data?.educatorId;
  const courseId = modal.data?.courseId;
  const chapterId = modal.data?.chapterId;
  const mimeType = file?.contentType;
  const isModalOpen = modal.isOpen && modal.type === "COURSE_FILE_VIEWER";

  const [educator, setEducator] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState(file?.url);

  const [ratingValue, setRatingValue] = useState<number>(0);
  const [totalViews, setTotalViews] = useState<number>(0);

  useEffect(() => {
    if (file && isModalOpen) {
      setPreviewUrl(file?.url);
    }
  }, [file, isModalOpen]);

  useEffect(() => {
    async function getEducator(id: number) {
      const educator = await getProfileById(id);
      setEducator(educator);
    }
    if (educatorId && isModalOpen) {
      getEducator(educatorId);
    }
  }, [educatorId, isModalOpen]);

  const getInitialData = useCallback(async () => {
    if (isModalOpen) {
      try {
        const payload = {
          course_collection_id: courseId,
          content_id: file.id,
        };
        const headers = {
          headers: {
            Authorization: session?.user?.accessToken,
          },
        };
        const rating = await axios
          .post(`/content/getContentRating`, payload, headers)
          .then((res) => +res.data?.data?.rating || 0);
        await axios.post(
          `/content/addContentViews`,
          {
            course_collection_id: courseId,
            content_id: file.id,
            book_data: null,
            chapter_content_mapping_id: chapterId,
            educator_id: educatorId,
            duration: null,
          },
          {
            headers: {
              Authorization: session?.user?.accessToken,
            },
          }
        );
        const views = await axios
          .post(`/content/getContentView`, payload, headers)
          .then((res) => +res.data?.data?.total || 0);

        if (rating) {
          setRatingValue(rating);
        }

        if (views) {
          setTotalViews(views);
        }
      } catch (error: any) {
        console.log(error?.response?.data);
      }
    }
  }, [courseId, file, session, isModalOpen, educatorId, chapterId]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleAddRating = async (rating: number) => {
    setRatingValue(rating);
    const payload = {
      course_collection_id: courseId,
      content_id: file.id,
      rating,
    };
    try {
      await axios.post(`/content/addContentRatings`, payload, {
        headers: {
          Authorization: session?.user?.accessToken,
        },
      });
      toast.success(
        "🌟 Thank you! Your rating has been added. We appreciate your feedback."
      );
      router.refresh();
    } catch (error: any) {
      console.log(error?.response?.data);
    }
  };

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .post("/dam/file-service/get-link", {
  //       path: file?.data?.upload_path,
  //       user_id: session?.user?.userId,
  //     })
  //     .then((res) => {
  //       if (res.data && res.data !== "error") {
  //         setPreviewUrl(res.data);
  //       }
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [file, session]);

  const handleClose = () => {
    setRatingValue(0);
    setTotalViews(0);
    setPreviewUrl("");
    modal.onModalClose();
  };

  if (!isModalOpen || !file) return null;

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="sm:max-w-4xl bg-white p-0 space-y-0 gap-0 border-[var(--brand-color)] shadow-[var(--brand-shadow)] overflow-y-auto max-h-screen no-scrollbar">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-2 py-2">
          <DialogTitle className="flex items-center justify-between gap-x-2 w-full">
            <p className="shrink-0 flex-1 text-sm text-slate-500 px-2 line-clamp-1">
              {file?.title}
            </p>
            {mimeType === "Video" && session?.user.type === "Student" && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="w-auto h-auto px-4 py-2 ml-auto"
                asChild
                onClick={handleClose}
              >
                <Link href={`/annotations?url=${file.url}&type=${file.from}`}>
                  Add Notes
                </Link>
              </Button>
            )}

            <DialogClose asChild className="shrink-0">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="w-auto h-auto p-2 hover:bg-slate-200"
                onClick={handleClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="min-h-[200px]  p-0 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <Fragment>
              {previewUrl && mimeType === "Image" && (
                <div className="aspect-video">
                  <div className="relative w-full h-full">
                    <Image
                      src={previewUrl}
                      fill
                      className="object-contain"
                      alt="preview"
                      blurDataURL={
                        "data:image/jpeg;base64,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"
                      }
                      placeholder="blur"
                      sizes="100%"
                    />
                  </div>
                </div>
              )}

              {previewUrl && mimeType === "Video" && (
                <VideoPlayer src={previewUrl} />
              )}

              {previewUrl && mimeType === "Audio" && (
                <AudioPlayer src={previewUrl} />
              )}

              {previewUrl && mimeType === "Document" && (
                <div className="w-full h-[500px]">
                  <DocxViewer url={previewUrl} />
                </div>
              )}
              {previewUrl && mimeType === "Blog" && (
                <div className="w-full h-[500px]">
                  <iframe
                    src={file?.url}
                    style={{ border: 0, width: "100%", minHeight: "100%" }}
                    id="iframe-id"
                  />
                </div>
              )}
            </Fragment>
          )}

          {/* details */}
          <div className="px-4 pb-4 space-y-4">
            {/* title and description */}
            <div className="flex flex-col gap-y-2">
              <h4 className="text-sm md:text-base font-semibold tracking-tight text-slate-800">
                {file?.title}
              </h4>
              {file?.description && (
                <ReadMoreText
                  text={file?.description}
                  className="text-xs md:text-sm text-slate-500"
                />
              )}

              <span className="text-xs text-slate-600 tracking-tighter font-semibold">
                {file?.createdAt &&
                  format(new Date(file.createdAt), "MMM dd, yyyy 'at' hh:mm")}
              </span>
            </div>
            {educatorId && courseId && chapterId && (
              <Fragment>
                <Separator className="my-2" />

                {/* educator, rating and views */}
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <UserAvatar src={educator?.image} className="w-10 h-10" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold tracking-tight">
                        {educator?.name}
                      </span>
                      <span className="text-xs font-[500] tracking-tighter text-slate-500">
                        {educator?.designation}
                      </span>
                    </div>
                  </div>
                  <div className="w-[2px] h-4 bg-slate-200 rounded-full" />
                  <div className="w-fit">
                    <p className="text-xs text-slate-400 font-semibold">
                      Rating
                    </p>
                    <RatingInput
                      value={ratingValue}
                      size={80}
                      onChange={(rating: number) => handleAddRating(rating)}
                    />
                  </div>
                  <div className="w-[2px] h-4 bg-slate-200 rounded-full" />
                  <div className="flex flex-col items-start justify-start">
                    <p className="text-xs text-slate-400 font-semibold">
                      Views
                    </p>
                    <span className="text-xs text-slate-800 font-semibold">
                      {totalViews}
                    </span>
                  </div>
                </div>

                <Separator className="my-2" />

                {/* comments */}
                <CourseFileComments courseId={courseId} contentId={file.id} />
              </Fragment>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
