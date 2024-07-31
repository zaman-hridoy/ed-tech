"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookOpenText,
  GraduationCap,
  HelpCircle,
  HelpingHand,
  PencilRulerIcon,
  RouteIcon,
  School,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { Button } from "../ui/button";
import Logo from "./logo";

interface Props {
  children: React.ReactNode;
  side?: "left" | "top" | "bottom" | "right" | null | undefined;
}

const MobileSidebar = ({ children, side }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[300px]" side={side}>
        <SheetHeader onClick={() => setOpen(false)}>
          <Logo />
        </SheetHeader>

        <Separator className="my-4" />

        {/* actions menu */}
        <div className="flex flex-col gap-y-1">
          {menuOptions.map((option) => (
            <Button
              asChild
              key={option.title}
              variant="ghost"
              className="justify-start"
              onClick={() => setOpen(false)}
            >
              <Link
                href={option.url}
                className="flex items-center gap-x-2 text-sm font-semibold tracking-tight text-slate-700 hover:text-slate-900 transition-all"
              >
                {option.icon}
                {option.title}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

const menuOptions = [
  {
    title: "Solution for Students",
    icon: <GraduationCap className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/solution-for-students",
  },
  {
    title: "Solution for Educators",
    icon: <HelpingHand className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/solution-for-educators",
  },

  {
    title: "Solution for Content Creators",
    icon: <PencilRulerIcon className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/solution-for-content-creators",
  },

  {
    title: "Solution for Institutions",
    icon: <School className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/solution-for-institutions",
  },
  {
    title: "What is ST?",
    icon: <HelpCircle className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/what-is-st",
  },
  {
    title: "Books",
    icon: <BookOpenText className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/books",
  },
  {
    title: "Flatform",
    icon: <RouteIcon className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/flatform",
  },
  {
    title: "About Us",
    icon: <UserCheck className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/about",
  },
];
