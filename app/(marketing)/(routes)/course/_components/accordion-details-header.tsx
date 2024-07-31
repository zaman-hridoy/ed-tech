"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/hooks/use-global-store";
import axios from "@/lib/instance";
import { CourseDataType } from "@/lib/types";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ActionOptions from "./action-options";

interface Props {
  course: CourseDataType;
}

const AccordionDetailsHeader = ({ course }: Props) => {
  const { data } = useSession();
  const { followedCourses } = useGlobalStore();
  const router = useRouter();
  const [followLoading, setFollowLoading] = useState(false);

  const handleFollowUnfollow = async (status: "active" | "inactive") => {
    setFollowLoading(true);
    try {
      await axios.post(
        "/content/courses/createAndUpdateCourseCollectionStatus",
        {
          course_collection_id: course.id,
          student_id: data?.user?.userId,
          status,
        },
        {
          headers: {
            Authorization: data?.user?.accessToken,
          },
        }
      );
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.Please try again later!");
    } finally {
      setFollowLoading(false);
    }
  };

  const isFollowing = followedCourses.some((c) => c.id === course.id);

  const isOwner = data?.user?.userId === course.educator_id;
  const isInMyCourseList =
    !isOwner && data?.user?.type === "Student" && isFollowing;
  const isNotInMyCourseList =
    !isOwner && data?.user?.type === "Student" && !isFollowing;

  return (
    <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-3 justify-between">
      <h2 className="text-base uppercase text-slate-900 font-bold tracking-tight">
        Collection Details
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold tracking-tight text-slate-400">
          {/* Updated on July 17, 2023 at 02:18 pm */}
          {course?.updated_at && (
            <>
              Updated on{" "}
              {format(
                new Date(course.updated_at),
                "MMM dd, yyyy 'at' hh:mm aaa"
              )}
            </>
          )}
        </span>
        {isOwner && (
          <>
            {course.active_status && (
              <Badge className="bg-[var(--brand-color)] text-sm py-1 pointer-events-none">
                Published
              </Badge>
            )}
            {!course.active_status && (
              <Badge className="bg-slate-200 text-zinc-800 text-sm py-1 pointer-events-none">
                Unpublished
              </Badge>
            )}
          </>
        )}

        {isNotInMyCourseList && (
          <Button
            variant="primary"
            size="sm"
            className="text-xs tracking-tight w-auto h-auto py-2 flex items-center gap-x-1"
            onClick={() => handleFollowUnfollow("active")}
            disabled={followLoading}
          >
            {followLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Mark as active
          </Button>
        )}
        {isInMyCourseList && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs tracking-tight w-auto h-auto py-2 bg-[var(--brand-color-success)] text-white hover:bg-[var(--brand-color-success)] hover:text-white flex items-center gap-x-1"
            onClick={() => handleFollowUnfollow("inactive")}
            disabled={followLoading}
          >
            {followLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Mark as inactive
          </Button>
        )}

        {isOwner && <ActionOptions course={course} />}
      </div>
    </div>
  );
};

export default AccordionDetailsHeader;
