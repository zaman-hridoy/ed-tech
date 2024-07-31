import { Button } from "@/components/ui/button";
import { BookImage } from "lucide-react";

const SearchBookItem = () => {
  return (
    <div className="w-full border pb-2 flex flex-col items-center rounded-md gap-y-2">
      <div className="aspect-square bg-zinc-100 w-full shadow-none">
        <BookImage className="w-full h-full text-zinc-200" />
      </div>
      <div className="px-2 w-full">
        <h4 className="text-black text-sm md:text-base font-medium line-clamp-2">
          Introduction to economics
        </h4>
        <span className="text-xs md:text-sm text-zinc-500">24 channels</span>
      </div>
      <div className="px-2 w-full">
        <Button variant="secondary" className="w-full" size="sm">
          Join
        </Button>
      </div>
    </div>
  );
};

export default SearchBookItem;
