import { FolderSearch } from "lucide-react";

interface Props {
  icon?: React.ReactNode;
  emptyText?: string;
}

const EmptySection = ({ icon, emptyText }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-4 gap-y-5 pointer-events-none select-none">
      <div className="border rounded-full p-4 w-fit">
        {icon || <FolderSearch className="w-8 h-8 text-slate-300" />}
      </div>
      <span className="text-sm text-slate-400 font-medium tracking-tight text-center">
        {emptyText || `You don't have any data yet.`}
      </span>
    </div>
  );
};

export default EmptySection;
