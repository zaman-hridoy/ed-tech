"use client";

import { ConfirmAlertModal } from "@/components/confirm-alert-modal";
import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/hooks/use-course-store";
import axios from "@/lib/instance";
import { UserProfileType } from "@/lib/types";
import { Save } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdPublish, MdUpdate } from "react-icons/md";

interface Props {
  profile: UserProfileType;
}

type CreatedCollectionType = {
  id: number;
  slug: string;
};

const CollectionNav = ({ profile }: Props) => {
  const session = useSession();
  const router = useRouter();
  const { clearCourseStoredData, collection } = useCourseStore();
  const [loading, setLoading] = useState(false);

  const validateCollection = () => {
    if (collection.course_collection_type === "course") {
      if (!collection.collectionName) {
        toast.error("Please give your collection a name.");
        return;
      }
    }
    if (collection.course_collection_type === "module") {
      if (!collection.module_name) {
        toast.error("Please give your module a name.");
        return;
      }
    }

    if (!collection.description) {
      toast.error("Please write a short description about your course.");
      return;
    }

    if (!collection.books || collection.books?.length === 0) {
      toast.error("Please choose at least one book for your course.");
      return;
    }

    if (!collection.chapters || collection.chapters?.length === 0) {
      toast.error("Please add at least one chapter.");
      return;
    }

    const chaptersWithFiles = collection.chapters.find(
      (chapter) => chapter.files.length > 0
    );

    if (!chaptersWithFiles) {
      toast.error(
        "Please add files on chapters for saving or publishing your course."
      );
    }

    const newData = {
      course_collection_type: collection.course_collection_type, // course or module
      collectionName: collection.collectionName,
      educatorName: profile.name,
      educator_id: profile.userId,
      description: collection.description,
      module_name: collection.module_name,
      course: {
        id: collection.subject?.id,
        name: collection?.subject?.course_name,
      },
      books_json: collection.books,
      chapter_content_mapping: collection.chapters,
      chapters: collection.chapters?.map((c) => ({
        id: c.id,
        name: c.chapterName,
      })),
      book: {
        id: null,
        name: "",
      },
    };

    return newData;
  };

  const handleSaveCollection = async (isPublish = false) => {
    const payload = validateCollection();
    if (!payload) return;
    let toastId = "";
    try {
      setLoading(true);
      toastId = toast.loading("Saving...");
      let createdCourse: CreatedCollectionType | null = null;

      if (!collection.is_editing) {
        const res = await axios.post(
          "/content/courses/createCourseCollection",
          payload,
          {
            headers: {
              Authorization: session?.data?.user?.accessToken,
            },
          }
        );
        createdCourse = {
          id: res.data?.course_collection?.id,
          slug: res.data?.course_collection?.slug,
        };
      } else {
        // update template
        if (!collection.is_active) {
          const updatedPayload = {
            ...payload,
            id: collection.collection_id,
            active_status: false,
          };

          const res = await axios.post(
            "/content/courses/editCourseCollection",
            updatedPayload,
            {
              headers: {
                Authorization: session?.data?.user?.accessToken,
              },
            }
          );
          createdCourse = {
            id: res.data?.data[0]?.id,
            slug: res.data?.data[0]?.slug,
          };
        } else {
          // update active course
          const updatedPayload = {
            ...payload,
            id: collection.collection_id,
          };
          const res = await axios.post(
            "/content/courses/editActiveCourseCollection",
            updatedPayload,
            {
              headers: {
                Authorization: session?.data?.user?.accessToken,
              },
            }
          );
          createdCourse = {
            id: res.data?.data[0]?.id,
            slug: res.data?.data[0]?.slug,
          };
        }
      }

      if (isPublish && collection.collection_id) {
        handlePublishCollection(collection.collection_id);
      } else {
        toast.success("Course saved successfully.");
        router.replace(`/course/${createdCourse.slug}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const handlePublishCollection = async (courseId: number) => {
    let toastId = "";
    try {
      toastId = toast.loading("Publishing...");
      const res = await axios.post(
        `/content/courses/createCourseCollectionById/${courseId}`,
        {
          slug: `${collection?.collectionName} ${
            collection?.subject?.course_name
          } ${profile.name}  ${Date.now()}`,
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

  // if (loading) {
  //   return (
  //     <Dialog open={true}>
  //       <DialogContent className="sm:max-w-[425px] bg-white p-10">
  //         <div className="text-base flex items-center justify-center gap-x-2 font-semibold">
  //           <Loader2 className="w-5 h-5 animate-spin text-[var(--brand-color)]" />
  //           Submitting...
  //         </div>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  return (
    <nav className="px-4 py-2 border-b shadow-sm bg-white flex flex-row justify-between items-center gap-x-2 md:gap-x-6 fixed top-0 left-0 right-0 z-50">
      <Link href="/dashboard">
        <div className="relative w-[147px] h-[30px] lg:w-[167px] lg:h-[40px]">
          <Image
            src="/logos/logo.svg"
            alt="Simplitaught"
            fill
            priority
            className="object-contain"
          />
        </div>
      </Link>

      <div className="flex items-center gap-x-2">
        <ConfirmAlertModal
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your chapters and files from your created collection."
          onContinue={() => {
            clearCourseStoredData();
            router.push("/dashboard");
          }}
        >
          <Button variant="secondary" disabled={loading}>
            Cancel
          </Button>
        </ConfirmAlertModal>
        {!collection.is_active && (
          <Button
            className="bg-[var(--brand-color-secondary)] hover:bg-[var(--brand-color-secondary)] gap-x-2"
            onClick={() => handleSaveCollection()}
            disabled={loading}
          >
            Save <Save className="w-4 h-4 text-inherit" />
          </Button>
        )}

        {!collection.is_active && (
          <Button
            className="gap-x-2"
            variant="primary"
            onClick={() => handleSaveCollection(true)}
            disabled={loading}
          >
            Publish <MdPublish className="w-4 h-4 text-inherit" />
          </Button>
        )}

        {collection.is_active && (
          <Button
            className="gap-x-2"
            variant="primary"
            onClick={() => handleSaveCollection()}
            disabled={loading}
          >
            Update <MdUpdate className="w-5 h-5 text-inherit" />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default CollectionNav;
