import { Loader2 } from "lucide-react";
import ReaderNavbar from "../_components/reader-navbar";

const ReaderLoader = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <ReaderNavbar />
      <div className="pt-14 pb-20 h-full flex items-center justify-center">
        <div className="flex items-center gap-x-2 text-slate-500">
          <Loader2 className="animate-spin" /> <p>Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default ReaderLoader;
