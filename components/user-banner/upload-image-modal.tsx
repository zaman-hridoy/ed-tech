"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

interface Props {
  children: React.ReactNode;
}

export function UploadImageModal({ children }: Props) {
  const router = useRouter();
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPriviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const onDrop = (files: File[]) => {
    if (!!files.length) {
      const url = URL.createObjectURL(files[0]);
      setPriviewUrl(url);
      setFile(files[0]);
    }
  };

  const onCancel = () => {
    setLoading(false);
    setProgress(0);
    setPriviewUrl(null);
    setOpen(false);
  };

  const onUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("attachment", file);
      formData.append("title", "User avatar");
      formData.append("description", "user profile pic");
      formData.append("contentType", "text");
      formData.append("isPremium", "true");
      formData.append("type", "image");
      const res = await axios.post("/content/uploadattchment", formData, {
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
        onUploadProgress: function (progressEvent) {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      if (res.data?.success) {
        const uploadedImageUrl = res.data?.data?.url;

        // update profile image
        await axios.post(
          "/profile/UserInformationEdit",
          { image: uploadedImageUrl },
          {
            headers: {
              Authorization: `${session.user?.accessToken}`,
            },
          }
        );

        // update image on elastic search
        await axios.put("/search/user/update", {
          id: session?.user?.userId,
          image: uploadedImageUrl,
        });

        //todo: need to update for chat user

        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        JSON.stringify(
          error?.response?.data || "Something went wrong.Please try again!"
        )
      );
    } finally {
      onCancel();
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[355px] p-4">
        <DialogHeader>
          <DialogTitle className="text-base">
            Upload Display Picture
          </DialogTitle>
        </DialogHeader>
        <Separator className="bg-slate-100" />

        <Dropzone
          onDrop={onDrop}
          multiple={false}
          maxFiles={1}
          accept={{
            "image/png": [],
            "image/jpg": [],
            "image/jpeg": [],
          }}
          disabled={loading}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center gap-y-4 text-sm font-semibold tracking-tight text-slate-400 text-center relative w-full h-60 cursor-pointer"
              >
                <input {...getInputProps()} />
                <Button className="flex-col h-auto" variant="outline">
                  <User2 className="w-8 h-8" />
                  <p>
                    Drag n Drop or Browse <br /> Your Picture
                  </p>
                </Button>
                {previewUrl && (
                  <Image
                    src={previewUrl}
                    alt="preview Url"
                    fill
                    className="object-contain"
                  />
                )}
                {previewUrl && loading && (
                  <div className="absolute bottom-0 left-0 w-full bg-slate-200/75 p-2 rounded-md text-left">
                    <Progress className="h-2" value={progress} />
                    <p className="text-sm font-semibold text-slate-600">
                      Uploading...({progress}%)
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </Dropzone>

        <DialogFooter className="gap-3 flex-row justify-between">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 shrink-0"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="primary"
            className="flex-1 shrink-0"
            disabled={loading || !file}
            onClick={onUpload}
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
