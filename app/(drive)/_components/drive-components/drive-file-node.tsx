import { TreeNodeType } from "@/lib/types";
import { CiFileOn } from "react-icons/ci";

const DriveFileNode = ({ name }: TreeNodeType) => {
  return (
    <div className="pl-1 flex items-center space-x-2 hover:bg-slate-100 cursor-pointer py-[2px] rounded-md transition-all">
      <CiFileOn className="text-slate-800 shrink-0" />
      <span className="text-sm tracking-tight line-clamp-1">{name}</span>
    </div>
  );
};

export default DriveFileNode;
