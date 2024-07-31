"use client";

import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { useState } from "react";

interface Props {
  text: string;
  className?: string;
  lineclampClass?: string;
}

const ReadMoreText = ({
  text,
  className,
  lineclampClass = "line-clamp-5",
}: Props) => {
  const [enableOption] = useState(text.length > 1000);
  const [showMore, setShowMore] = useState(false);

  if (!enableOption) {
    return (
      <div className="flex flex-col">
        <p className={cn("text-sm tracking-tight", className, lineclampClass)}>
          {parse(text)}
        </p>
      </div>
    );
  }

  if (!showMore) {
    return (
      <div className="flex flex-col">
        <p className={cn("text-sm tracking-tight", className, lineclampClass)}>
          {parse(text)}
        </p>
        <span
          onClick={() => setShowMore((prev) => !prev)}
          className="shrink-0 w-fit text-slate-900 text-sm tracking-tight cursor-pointer hover:underline"
        >
          Show more
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className={cn("text-sm tracking-tight", className)}>{parse(text)}</p>
      <span
        onClick={() => setShowMore((prev) => !prev)}
        className="shrink-0 w-fit text-slate-900 text-sm tracking-tight cursor-pointer hover:underline"
      >
        Show less
      </span>
    </div>
  );
};

export default ReadMoreText;
