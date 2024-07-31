import axios from "@/lib/instance";
import { CourseFileType, SessionWithUserType } from "@/lib/types";
import { FileText, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
  file: CourseFileType;
}

const DocumentPreview = ({ file }: Props) => {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const [preview, setPreview] = useState<string>("");
  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    if (file.from === "MY_DRIVE") {
      axios
        .post("/dam/file-service/get-link", {
          path: file?.url,
          user_id: session?.user?.userId,
        })
        .then((res) => {
          if (res.data && res.data !== "error") {
            setPreview(res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setPreview(file?.url);
    }
  }, [file, session]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const loader = (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );

  const defaultComp = (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-fuchsia-500">
      <div className="w-12 h-12 rounded-full flex items-center justify-center">
        <FileText className="w-8 h-8 text-white" />
      </div>
    </div>
  );

  const pdfIconComp = (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-fuchsia-500">
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
      >
        <defs></defs>
        <title></title>
        <g id="xxx-word">
          <path d="M325,105H250a5,5,0,0,1-5-5V25a5,5,0,0,1,10,0V95h70a5,5,0,0,1,0,10Z"></path>
          <path d="M325,154.83a5,5,0,0,1-5-5V102.07L247.93,30H100A20,20,0,0,0,80,50v98.17a5,5,0,0,1-10,0V50a30,30,0,0,1,30-30H250a5,5,0,0,1,3.54,1.46l75,75A5,5,0,0,1,330,100v49.83A5,5,0,0,1,325,154.83Z"></path>
          <path d="M300,380H100a30,30,0,0,1-30-30V275a5,5,0,0,1,10,0v75a20,20,0,0,0,20,20H300a20,20,0,0,0,20-20V275a5,5,0,0,1,10,0v75A30,30,0,0,1,300,380Z"></path>
          <path d="M275,280H125a5,5,0,0,1,0-10H275a5,5,0,0,1,0,10Z"></path>
          <path d="M200,330H125a5,5,0,0,1,0-10h75a5,5,0,0,1,0,10Z"></path>
          <path d="M325,280H75a30,30,0,0,1-30-30V173.17a30,30,0,0,1,30-30h.2l250,1.66a30.09,30.09,0,0,1,29.81,30V250A30,30,0,0,1,325,280ZM75,153.17a20,20,0,0,0-20,20V250a20,20,0,0,0,20,20H325a20,20,0,0,0,20-20V174.83a20.06,20.06,0,0,0-19.88-20l-250-1.66Z"></path>
          <path d="M145,236h-9.61V182.68h21.84q9.34,0,13.85,4.71a16.37,16.37,0,0,1-.37,22.95,17.49,17.49,0,0,1-12.38,4.53H145Zm0-29.37h11.37q4.45,0,6.8-2.19a7.58,7.58,0,0,0,2.34-5.82,8,8,0,0,0-2.17-5.62q-2.17-2.34-7.83-2.34H145Z"></path>
          <path d="M183,236V182.68H202.7q10.9,0,17.5,7.71t6.6,19q0,11.33-6.8,18.95T200.55,236Zm9.88-7.85h8a14.36,14.36,0,0,0,10.94-4.84q4.49-4.84,4.49-14.41a21.91,21.91,0,0,0-3.93-13.22,12.22,12.22,0,0,0-10.37-5.41h-9.14Z"></path>
          <path d="M245.59,236H235.7V182.68h33.71v8.24H245.59v14.57h18.75v8H245.59Z"></path>
        </g>
      </svg>
    </div>
  );

  return (
    <div className="w-full h-full relative overflow-hidden">
      {`${file.fileExtention}`.toLowerCase() === "pdf" && preview ? (
        <Document
          file={preview}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={pdfIconComp}
          error={pdfIconComp}
          onLoadError={(err) => console.log("PDF load error", err)}
        >
          <Page pageNumber={1} />
        </Document>
      ) : (
        defaultComp
      )}
    </div>
  );
};

export default DocumentPreview;
