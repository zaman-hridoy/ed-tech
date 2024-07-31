import { TreeNodeType } from "@/lib/types";
import DriveFileCard from "./drive-file-card";

interface Props {
  title: string;
  files: TreeNodeType[];
  recent?: boolean;
}

const DriveFileList = ({ title, files, recent = false }: Props) => {
  if (files.length === 0) return null;
  return (
    <div className="space-y-2">
      <h5 className="text-sm font-semibold text-slate-500">{title}</h5>

      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {files.map((file) => (
          <DriveFileCard key={file.id} {...file} recent={recent} />
        ))}
      </div>
    </div>
  );
};

export default DriveFileList;
