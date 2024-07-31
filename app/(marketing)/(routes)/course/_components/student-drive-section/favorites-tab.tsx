"use client";

import CourseFileCard from "@/components/course-file-card";
import CourseFileSkeleton from "@/components/skeletons/course-file-skeleton";
import axios from "@/lib/instance";
import { CourseFileType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import { ServerCrash } from "lucide-react";
import { useSession } from "next-auth/react";
import { RiDragDropFill } from "react-icons/ri";

const FavouritesTab = () => {
  const { data } = useSession();
  const { isOver, setNodeRef } = useDroppable({
    id: "course-favorite-dropable",
  });

  const fetchData = async (userId?: number) => {
    if (!userId) return;

    const res = await axios.get(`/content/favorites/${data?.user?.userId}`, {
      headers: {
        Authorization: data?.user?.accessToken,
      },
    });
    const favItems = res.data?.message || [];
    const updatedItems: CourseFileType[] = favItems.map((item: any) => {
      const file: CourseFileType = {
        id: item?.id,
        fileName: item?.content?.fileName,
        url: item?.content?.url,
        type: item?.content?.type,
        fileExtention: item?.content?.fileExtention,
        contentType: item?.content?.contentType,
        premium: item?.content?.premium,
        preview: item?.content?.preview,
        duration: item?.content?.duration,
        createdAt: item?.content?.createdAt,
        from: item?.content?.from,
        title: item?.content?.title || "",
        description: item?.content?.description || "",
        keywords: item?.content?.keywords || "",
      };

      return file;
    });
    return updatedItems;
  };

  const state = useQuery({
    queryKey: ["course_favorites"],
    queryFn: () => fetchData(data?.user?.userId),
    enabled: !!data?.user,
  });

  if (state.status === "pending") {
    return (
      <div className="h-full">
        <div className="grid grid-cols-2 gap-2">
          {[...new Array(8)].map((key) => (
            <CourseFileSkeleton key={key} />
          ))}
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <ServerCrash className="w-10 h-10" />
        <p className="text-sm text-slate-500">Something went wrong!</p>
      </div>
    );
  }

  const files: CourseFileType[] = state.data || [];

  return (
    <div
      className={cn(
        "h-[80vh] overflow-y-auto no-scrollbar px-4 py-2 relative",
        isOver && "overflow-hidden"
      )}
    >
      {isOver && (
        <div className="absolute top-0 left-0 z-30 w-full h-full bg-slate-200 flex flex-col items-center justify-center">
          <RiDragDropFill className="w-20 h-20 text-zinc-400" />
          <p className="text-sm text-zinc-500">Drop here</p>
        </div>
      )}
      {!isOver && (
        <div className="h-full" ref={setNodeRef}>
          <div className="grid grid-cols-2 gap-2">
            {files.map((file) => (
              <CourseFileCard key={file.id} file={file} enableDrag={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesTab;
