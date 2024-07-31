import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDrivePreview } from "@/hooks/use-drive-preview";
import { useModal } from "@/hooks/use-modal-store";
import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { format } from "date-fns";
import { Download, Eye, PlayCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { BsMusicPlayerFill } from "react-icons/bs";
import { FaWordpressSimple } from "react-icons/fa";
import { FaFileLines, FaFilePdf, FaRegImage } from "react-icons/fa6";
import { MdLibraryMusic } from "react-icons/md";
import ExamImageRenderer from "./exam-image-renderer";

const imageMimeTypes = ["Image"];
const videoMimeTypes = ["Video"];
const audioMimeTypes = ["Audio"];
const docsMimeType = [
  "Document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const pdfMimeType = ["Document", "application/pdf"];

const ExamPreview = () => {
  const { data } = useSession();
  const session = data as SessionWithUserType;

  const store = useDrivePreview();
  const modal = useModal();
  const file = store?.data!;
  const mimeType = file?.data?.contentType;

  const [previewUrl, setPreviewUrl] = useState("");
  useEffect(() => {
    if (!imageMimeTypes.includes(mimeType)) {
      axios
        .post("/dam/file-service/get-link", {
          path: file?.data?.upload_path,
          user_id: session?.user?.userId,
        })
        .then((res) => {
          if (res.data && res.data !== "error") {
            setPreviewUrl(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [file, session, mimeType]);

  const getRenderer = () => {
    if (imageMimeTypes.includes(mimeType)) {
      return <ExamImageRenderer file={file} />;
    } else if (videoMimeTypes.includes(mimeType)) {
      return <BiSolidMoviePlay className="w-10 h-10 text-rose-500" />;
    } else if (audioMimeTypes.includes(mimeType)) {
      return <MdLibraryMusic className="w-10 h-10 text-rose-500" />;
    } else if (docsMimeType.includes(mimeType)) {
      return <FaWordpressSimple className="w-10 h-10 text-blue-500" />;
    } else if (pdfMimeType.includes(mimeType)) {
      return <FaFilePdf className="w-10 h-10 text-emerald-500" />;
    } else {
      return <FaFileLines className="w-10 h-10 text-slate-400" />;
    }
  };

  const renderBtns = () => {
    if (imageMimeTypes.includes(mimeType)) {
      return (
        <Button
          variant="secondary"
          className="w-full gap-x-2 hover:bg-slate-200"
          size="sm"
          onClick={() => modal.onModalOpen("EXAM_FILE_VIEWER", { ...file })}
        >
          <FaRegImage className="w-4 h-4" />
          Preview
        </Button>
      );
    } else if (videoMimeTypes.includes(mimeType)) {
      return (
        <Button
          variant="secondary"
          className="w-full gap-x-2 hover:bg-slate-200"
          size="sm"
          onClick={() => modal.onModalOpen("EXAM_FILE_VIEWER", { ...file })}
        >
          <PlayCircle className="w-4 h-4" />
          Play
        </Button>
      );
    } else if (audioMimeTypes.includes(mimeType)) {
      return (
        <Button
          variant="secondary"
          className="w-full gap-x-2 hover:bg-slate-200"
          size="sm"
          onClick={() => modal.onModalOpen("EXAM_FILE_VIEWER", { ...file })}
        >
          <BsMusicPlayerFill className="w-4 h-4" />
          Listen
        </Button>
      );
    } else if (pdfMimeType.includes(mimeType)) {
      return (
        <Button
          variant="secondary"
          className="w-full gap-x-2 hover:bg-slate-200"
          size="sm"
          onClick={() => modal.onModalOpen("EXAM_FILE_VIEWER", { ...file })}
        >
          <Eye className="w-4 h-4" />
          Read
        </Button>
      );
    } else {
      return (
        <Button
          variant="secondary"
          className="w-full gap-x-2 hover:bg-slate-200"
          size="sm"
          disabled={!previewUrl}
        >
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-x-2"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </Button>
      );
    }
  };

  return (
    <div className="p-4 space-y-8 select-none">
      <div className="space-y-4">
        <div className="aspect-video bg-slate-50 overflow-hidden flex items-center justify-center">
          {getRenderer()}
        </div>

        <div className="text-xs font-semibold text-slate-500 flex flex-col">
          <span className="text-[10px] text-slate-400">Filename</span>
          <p className="text-sm text-slate-800 font-semibold text line-clamp-2">
            {file?.name}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500 flex flex-col">
          <span className="text-[10px] text-slate-400">Type</span>
          <span className="text-slate-800">{mimeType}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500 flex flex-col">
          <span className="text-[10px] text-slate-400">Created on</span>

          <span className="text-slate-800">
            {file?.createdAt &&
              format(new Date(file?.createdAt), "MMM, dd yyyy")}
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-500 flex flex-col">
          <span className="text-[10px] text-slate-400">Updated on</span>

          <span className="text-slate-800">
            {file?.updatedAt &&
              format(new Date(file?.updatedAt), "MMM, dd yyyy")}
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="w-full gap-x-2 hover:bg-slate-200"
          size="sm"
          onClick={() => store.onFileClose()}
        >
          Close
        </Button>
        {renderBtns()}
      </div>
    </div>
  );
};

export default ExamPreview;
