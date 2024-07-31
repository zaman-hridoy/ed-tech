import { TreeNodeType } from "@/lib/types";
import ExamFolderCard from "./exam-folder-card";

interface Props {
  title: string;
  folders: TreeNodeType[];
  pageType: "exam-library" | "shared-with" | "shared-by";
}

const ExamFolderList = ({ title, folders, pageType }: Props) => {
  if (folders.length === 0) return null;
  return (
    <div className="space-y-2">
      <h5 className="text-sm font-semibold text-slate-500">{title}</h5>

      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {folders.map((folder) => (
          <ExamFolderCard key={folder.id} {...folder} pageType={pageType} />
        ))}
      </div>
    </div>
  );
};

export default ExamFolderList;
