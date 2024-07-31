"use client";

import { ConfirmAlertModal } from "@/components/confirm-alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CollectionDataType, useCourseStore } from "@/hooks/use-course-store";
import axios from "@/lib/instance";
import { CourseDataType } from "@/lib/types";
import { Edit3, MoreVertical, Trash2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdPublish } from "react-icons/md";

interface Props {
  course: CourseDataType;
}

const ActionOptions = ({ course }: Props) => {
  const session = useSession();
  const router = useRouter();
  const { updateCourseStore } = useCourseStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `/content/courses/deleteCourse/${course.id}`,
        {},
        {
          headers: {
            Authorization: session.data?.user.accessToken,
          },
        }
      );

      // todo: delete from elastic
      // await axios.delete(`/course/delete/${course.id}`);
      toast.success("Successfully deleted.");
      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublishCollection = async () => {
    let toastId = "";
    try {
      toastId = toast.loading("Publishing...");
      const res = await axios.post(
        `/content/courses/createCourseCollectionById/${course?.id}`,
        {
          slug: `${course?.collection_name} ${course?.course_name} ${
            course?.educator_name
          }  ${Date.now()}`,
        },
        {
          headers: {
            Authorization: session.data?.user.accessToken,
          },
        }
      );
      router.push(`/course/${res.data?.slug}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleEditCollection = () => {
    let toastId = "";
    try {
      toastId = toast.loading("Please wait...");
      const collectionObject: CollectionDataType = {
        is_editing: true,
        is_active: course.active_status,
        collection_id: course.id,
        course_collection_type: course.course_collection_type,
        collectionName: course.collection_name,
        description: course.collection_description,
        module_name: course.module_name,
        subject: {
          id: course.course_id,
          course_name: course.course_name,
        },
        books: course.books_json,
        chapters: course.chapter_content_mapping.map((chapter) => ({
          ...chapter,
          id: chapter.id.toString(),
        })),
      };

      updateCourseStore(collectionObject);
      router.push("/course/collection-editor");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild onClick={() => setOpen(true)}>
        <Button
          variant="ghost"
          size="icon"
          className="focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48"
        align="end"
        onInteractOutside={() => setOpen(false)}
      >
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            handleEditCollection();
            setOpen(false);
          }}
        >
          Edit collection
          <DropdownMenuShortcut>
            <Edit3 className="w-5 h-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        {!course.active_status && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handlePublishCollection();
              setOpen(false);
            }}
          >
            Publish
            <DropdownMenuShortcut>
              <MdPublish className="w-5 h-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}

        {course.active_status && (
          <DropdownMenuItem className="cursor-pointer">
            Unpublish
            <DropdownMenuShortcut>
              <MdPublish className="w-5 h-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <ConfirmAlertModal
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your collection."
          onContinue={handleDelete}
          loading={loading}
        >
          <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500">
            Delete
            <DropdownMenuShortcut>
              <Trash2Icon className="w-5 h-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </ConfirmAlertModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionOptions;
