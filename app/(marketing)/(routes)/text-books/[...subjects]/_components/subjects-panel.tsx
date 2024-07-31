"use client";

import EmptySection from "@/components/empty-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSticky } from "@/hooks/useSticky";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { matchSorter } from "match-sorter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { MdSubject } from "react-icons/md";

interface Props {
  label: string;
  subjectList: {
    link: string;
    subject: string;
  }[];
}

const SubjectsPanel = ({ label, subjectList }: Props) => {
  const router = useRouter();
  const { isSticky } = useSticky(10);
  const [value, setValue] = useState("");

  const filtered = matchSorter(subjectList, value, { keys: ["subject"] });

  return (
    <div className={cn("w-full bg-white", isSticky && "sticky top-0")}>
      <Button
        variant="link"
        className="text-[var(--brand-color)] hover:text-[var(--brand-color)] mt-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {decodeURIComponent(label)}
      </Button>
      <Separator className="my-2" />
      <div className="px-4">
        <Input
          placeholder="Search..."
          className="mb-2 bg-white border-[var(--brand-color)] focus-visible:ring-0 focus-visible:ring-offset-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="h-[75vh] pb-2 overflow-y-auto no-scrollbar">
        {filtered.length === 0 && (
          <EmptySection
            icon={<BiCategory className="text-slate-300" />}
            emptyText="No Subcategories"
          />
        )}
        {filtered.map((subject) => (
          <Link
            key={subject.subject}
            href={subject.link}
            className="text-sm md:text-base tracking-tight font-medium flex items-center hover:bg-slate-100 px-4 py-2"
          >
            <MdSubject className="w-4 h-4 mr-2" /> {subject.subject}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectsPanel;
