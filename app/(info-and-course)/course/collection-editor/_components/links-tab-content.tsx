"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getExtensionFromFile, matchYoutubeUrl } from "@/lib/helper-methods";
import { CourseFileType } from "@/lib/types";
import youtubeAPI from "@/lib/youtubeAPI";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import ShortUniqueId from "short-unique-id";
import FileEditForm from "./file-edit-form";

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

const FormSchema = z.object({
  url: z
    .string()
    .min(2, {
      message: "Please enter a valid url",
    })
    .url(),
});

function LinksTabContent() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [chapterFile, setChapterFile] = useState<CourseFileType | null>(null);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const youtubeId = matchYoutubeUrl(data.url);

    try {
      setLoading(true);
      if (youtubeId) {
        const res = await youtubeAPI.get("/videos", {
          params: {
            id: youtubeId,
            part: "contentDetails,snippet",
          },
        });
        if (res.data?.items?.length > 0) {
          const youtubeData = res.data?.items[0];
          const newFile: CourseFileType = {
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
            title: youtubeData?.snippet?.title,
            description: youtubeData?.snippet?.description,
            keywords: "",
          };
          setChapterFile(newFile);
          console.log({ newFile, youtubeData });
        }
      } else if (docsTypeExtensions.includes(getExtensionFromFile(data.url))) {
        const newFile: CourseFileType = {
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
          title: data.url,
          description: "",
          keywords: "",
        };
        setChapterFile(newFile);
      } else if (imageExtensions.includes(getExtensionFromFile(data.url))) {
        const newFile: CourseFileType = {
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
          title: data.url,
          description: "",
          keywords: "",
        };
        setChapterFile(newFile);
      } else if (audioExtemsions.includes(getExtensionFromFile(data.url))) {
        const newFile: CourseFileType = {
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
          title: data.url,
          description: "",
          keywords: "",
        };
        setChapterFile(newFile);
      } else {
        const newFile: CourseFileType = {
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
          title: data.url,
          description: "",
          keywords: "",
        };
        setChapterFile(newFile);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!chapterFile && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start justify-between gap-x-1"
          >
            <div className="flex-1">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter a valid link"
                        disabled={loading}
                        {...field}
                        className="w-full focus-visible:ring-offset-0 focus-visible:ring-2 ring-[var(--brand-color)] h-9"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="shrink-0 text-xs"
              disabled={loading}
              size="sm"
            >
              Add
            </Button>
          </form>
        </Form>
      )}
      {loading && (
        <div className="flex items-center justify-center w-full mt-5">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {chapterFile && (
        <FileEditForm
          file={chapterFile}
          onSuccess={() => {
            setChapterFile(null);
            form.reset();
          }}
          onCancel={() => {
            setChapterFile(null);
            form.reset();
          }}
        />
      )}
    </div>
  );
}

export default LinksTabContent;
