import { formatChapterName } from "@/lib/helper-methods";

interface Props {
  chapterName: string;
  files_count: number;
}

const AccordionChapterHeader = ({ chapterName, files_count }: Props) => {
  return (
    <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 justify-between w-full text-left">
      <h2 className="text-base text-slate-900 font-bold tracking-tight">
        {formatChapterName(chapterName)}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold tracking-tight text-slate-400 whitespace-nowrap shrink-0">
          {files_count > 0 ? files_count + " Added" : "Recommendations"}
        </span>
      </div>
    </div>
  );
};

export default AccordionChapterHeader;
