import { Separator } from "@/components/ui/separator";
import { LuBookCopy } from "react-icons/lu";

const ActiveCourseBooks = () => {
  return (
    <div className="bg-white rounded-md p-4 w-full min-h-[450px] shrink-0 flex flex-col">
      <h4 className="text-sm text-slate-500 font-semibold">Not yet baught</h4>
      <Separator className="my-2" />
      <div className="flex-1 flex flex-col items-center justify-center h-full space-y-2 select-none">
        <LuBookCopy className="w-14 h-14 text-slate-200" />
        <p className="text-sm text-slate-400 tracking-tight font-medium">
          No books found.
        </p>
      </div>
    </div>
  );
};

export default ActiveCourseBooks;
