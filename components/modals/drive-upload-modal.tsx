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
import { useModal } from "@/hooks/use-modal-store";
import { Uploader } from "@/lib/drive-upload";
import { formatBytes } from "@/lib/helper-methods";
import { SessionWithUserType } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Upload, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import { Progress } from "../ui/progress";

function DriveUploadModal() {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const router = useRouter();
  const queryClient = useQueryClient();

  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "UPLOAD_DRIVE_FILES";

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setUploading] = useState(false);

  const onDrop = (files: File[]) => {
    if (!!files.length) {
      const url = URL.createObjectURL(files[0]);
      setFile(files[0]);
    }
  };

  const onSuccess = () => {
    setUploading(false);
    toast.success("File upload successfully");
    router.refresh();
    handleClose();
  };

  const uploader = new Uploader({
    file: file,
    parentFolderList: "/",
    user_id: session?.user?.userId,
    parentFolder: modal?.data?.parentId,
    successCb: onSuccess,
  });

  let percentage: any = 0;

  const handleUploadFile = () => {
    if (!file) return;
    setUploading(true);
    uploader
      .onProgress(({ percentage: newPercentage, ...rest }: any) => {
        // to avoid the same percentage to be logged twice
        if (newPercentage !== percentage) {
          percentage = newPercentage;
          setProgress(percentage);
          if (percentage === 100) {
            setTimeout(() => {
              onSuccess();
            }, 5000);
          }
        }
      })
      .onError((error: any) => {
        setUploading(false);
        console.error(error);
        toast.error(JSON.stringify(error));
      });

    uploader.start();

    uploader.complete().then((status) => {
      console.log({ status });
    });
  };

  const handleClose = () => {
    setFile(null);
    setUploading(false);
    setProgress(0);
    modal.onModalClose();
  };

  const isSubmitting = loading;
  if (!isModalOpen) return null;
  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Upload on drive</DialogTitle>
          <DialogDescription>
            {`Add file and click upload when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div>
          {!file && (
            <Dropzone
              onDrop={onDrop}
              multiple={false}
              maxFiles={1}
              accept={{
                "image/png": [],
                "image/jpg": [],
                "image/jpeg": [],
                "video/mp4": [],
                "audio/mpeg": [],
                "application/pdf": [],
                "application/msword": [],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                  [],
                "application/vnd.ms-powerpoint": [],
                "application/excel": [],
                "application/vnd.ms-excel": [],
                "application/x-excel": [],
                "application/x-msexcel": [],
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  [],
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
                      <Upload className="w-8 h-8" />
                      <p>
                        Drag n Drop or Browse <br /> Your file
                      </p>
                    </Button>
                    {/* {previewUrl && loading && (
                  <div className="absolute bottom-0 left-0 w-full bg-slate-200/75 p-2 rounded-md text-left">
                    <Progress className="h-2" value={progress} />
                    <p className="text-sm font-semibold text-slate-600">
                      Uploading...({progress}%)
                    </p>
                  </div>
                )} */}
                  </div>
                </section>
              )}
            </Dropzone>
          )}
          {file && (
            <div className="py-8">
              <div className="flex items-center">
                <div>
                  <p className="text-sm text-slate-600 tracking-tight">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-600 tracking-tight font-semibold">
                    Size: {formatBytes(file.size)}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  className="w-auto h-auto p-1 ml-auto"
                  onClick={() => setFile(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {loading && (
                <div className="w-full bg-slate-200/75 p-2 rounded-md text-left mt-4">
                  <Progress className="h-2" value={progress} />
                  <p className="text-sm font-semibold text-slate-600">
                    Uploading...({progress}%)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
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
            onClick={handleUploadFile}
            type="button"
            variant="primary"
            className="gap-x-2"
            disabled={isSubmitting}
            size="sm"
          >
            {isSubmitting && (
              <Loader2 className="w-4 h-4 animate-spin transition" />
            )}
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DriveUploadModal;
