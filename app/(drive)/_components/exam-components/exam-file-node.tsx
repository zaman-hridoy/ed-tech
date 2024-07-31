import { TreeNodeType } from "@/lib/types";
import { CiFileOn } from "react-icons/ci";

const ExamFileNode = ({
  name,
  pageType,
}: TreeNodeType & {
  pageType: "exam-library" | "shared-with" | "shared-by";
}) => {
  return (
    <div className="pl-1 flex items-center space-x-2 hover:bg-slate-100 cursor-pointer py-[2px] rounded-md transition-all">
      <CiFileOn className="text-slate-800 shrink-0" />
      <span className="text-sm tracking-tight line-clamp-1" title={name}>
        {name}
      </span>
    </div>
  );
};

export default ExamFileNode;
