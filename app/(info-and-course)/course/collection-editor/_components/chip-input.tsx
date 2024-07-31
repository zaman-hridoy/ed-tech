"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { XCircle } from "lucide-react";
import { useState } from "react";

const ChipInput = () => {
  const [chips, setChips] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");

  return (
    <div className="w-full border rounded-md flex flex-wrap gap-1">
      {chips.map((chip) => (
        <Badge
          key={chip}
          variant="secondary"
          className="flex items-center gap-x-2 px-2 text-sm bg-white shrink-0"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {chip}{" "}
          <XCircle
            onClick={(e) => {
              setChips((prev) => prev.filter((el) => el !== chip));
            }}
            className="w-4 h-4"
          />
        </Badge>
      ))}
      <Input
        className="border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        placeholder="Type and press comma"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default ChipInput;
