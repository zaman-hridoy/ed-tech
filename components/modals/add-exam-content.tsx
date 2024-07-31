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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { getExtensionFromFile, matchYoutubeUrl } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { CourseFileType, SessionWithUserType } from "@/lib/types";
import youtubeAPI from "@/lib/youtubeAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ShortUniqueId from "short-unique-id";
import * as z from "zod";

const uid = new ShortUniqueId();

const docsTypeExtensions = [
  "doc",
  "docx",
  "html",
  "htm",
  "odt",
  "pdf",
  "xls",
  "xlsx",
  "ods",
  "ppt",
  "pptx",
  "txt",
];

const imageExtensions = ["jpeg", "jpg", "png", "gif", "tiff"];
const audioExtemsions = ["mp3", "wav", "ogg"];

const formSchema = z.object({
  title: z.string({ required_error: "Please enter folder name." }).min(1),
  url: z.string().min(5).url({ message: "Please enter a valid url" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

function AddExamContent() {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const router = useRouter();

  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "ADD_EXAM_CONTENT";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormSchemaType) => {
    try {
      setLoading(true);
      const parentId = modal.data?.parentId;
      const youtubeId = matchYoutubeUrl(data.url);
      let content: CourseFileType | null = null;

      if (youtubeId) {
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
            url: data.url,
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
            title: data.title || youtubeData?.snippet?.title,
            description: youtubeData?.snippet?.description,
            keywords: "",
          };
        }
      } else if (docsTypeExtensions.includes(getExtensionFromFile(data.url))) {
        content = {
          id: uid.stamp(15),
          fileName: data.url,
          url: data.url,
          type: "Core Concept",
          fileExtention: getExtensionFromFile(data.url),
          contentType: "Document",
          premium: false,
          preview: "",
          duration: "",
          createdAt: new Date().toDateString(),
          from: "EXTERNAL_URL",
          title: data.title,
          description: "",
          keywords: "",
        };
      } else if (imageExtensions.includes(getExtensionFromFile(data.url))) {
        content = {
          id: uid.stamp(15),
          fileName: data.url,
          url: data.url,
          type: "Core Concept",
          fileExtention: getExtensionFromFile(data.url),
          contentType: "Image",
          premium: false,
          preview: data.url,
          duration: "",
          createdAt: new Date().toDateString(),
          from: "EXTERNAL_URL",
          title: data.title,
          description: "",
          keywords: "",
        };
      } else if (audioExtemsions.includes(getExtensionFromFile(data.url))) {
        content = {
          id: uid.stamp(15),
          fileName: data.url,
          url: data.url,
          type: "Core Concept",
          fileExtention: getExtensionFromFile(data.url),
          contentType: "Audio",
          premium: false,
          preview: data.url,
          duration: "",
          createdAt: new Date().toDateString(),
          from: "EXTERNAL_URL",
          title: data.title,
          description: "",
          keywords: "",
        };
      } else {
        content = {
          id: uid.stamp(15),
          fileName: data.url,
          url: data.url,
          type: "Core Concept",
          fileExtention: "",
          contentType: "Blog",
          premium: false,
          preview: "",
          duration: "",
          createdAt: new Date().toDateString(),
          from: "EXTERNAL_URL",
          title: data.title,
          description: "",
          keywords: "",
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
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    modal.onModalClose();
  };

  const isSubmitting = form.formState.isSubmitting || loading;
  if (!isModalOpen) return null;
  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add content</DialogTitle>
          <DialogDescription>
            {`Make changes and click create when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Title"
                        className="text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                        disabled={isSubmitting}
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm font-semibold">URL</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Title"
                        className="text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isSubmitting}
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            variant="primary"
            className="gap-x-2"
            disabled={isSubmitting}
            size="sm"
          >
            {isSubmitting && (
              <Loader2 className="w-4 h-4 animate-spin transition" />
            )}
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddExamContent;
