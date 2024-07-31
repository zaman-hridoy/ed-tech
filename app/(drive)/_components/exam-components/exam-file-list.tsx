import { TreeNodeType } from "@/lib/types";
import ExamFileCard from "./exam-file-card";

interface Props {
  title: string;
  files: TreeNodeType[];
  pageType: "exam-library" | "shared-with" | "shared-by";
}

const ExamFileList = ({ title, files, pageType }: Props) => {
  if (files.length === 0) return null;
  return (
    <div className="space-y-2">
      <h5 className="text-sm font-semibold text-slate-500">{title}</h5>

      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {files.map((file) => (
          <ExamFileCard key={file.id} {...file} pageType={pageType} />
        ))}
      </div>
    </div>
  );
};

export default ExamFileList;
