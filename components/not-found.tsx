import { FileSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center max-w-sm mx-auto min-h-[60vh]">
      <div className="flex flex-col items-center justify-center text-center gap-y-4">
        <FileSearch className="w-16 h-16 text-slate-300" />
        <h2 className="text-2xl text-slate-600 tracking-tighter font-bold">{`This content isn't available right now`}</h2>
        <p className="text-base text-slate-500 font-semibold">
          {`Oops! The page you're looking for isn't here. Maybe it got lost! Check
          the web address or go back to find something else on our website.
          Sorry for any trouble!`}
        </p>
        <Button size="sm" variant="primary">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
