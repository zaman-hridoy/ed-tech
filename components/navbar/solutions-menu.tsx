"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const dropDownItems = [
  { label: "Students", href: "/solution-for-students" },
  { label: "Educators", href: "/solution-for-educators" },
  { label: "Content Creators", href: "/solution-for-content-creators" },
  { label: "Institutions", href: "/solution-for-institutions" },
];

interface Props {
  onVisible: (status: boolean) => void;
}

const SolutionsMenu = ({ onVisible }: Props) => {
  return (
    <div
      className="relative group"
      onMouseEnter={() => onVisible(true)}
      onMouseLeave={() => onVisible(false)}
    >
      <Button variant="ghost" className="font-semibold">
        Solutions <ChevronDown className="w-4 h-4 ml-2" />
      </Button>
      <div className="absolute top-100% -left-full bg-transparent invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 px-[134px] pt-[50px] pb-7">
        <div className="space-y-2">
          {dropDownItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`
                inline-block py-1 whitespace-nowrap relative hover:font-bold
                before:absolute before:w-0 before:h-[4px] before:bg-[#212CE6] before:bottom-1
                hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="fixed w-full" />
    </div>
  );
};

export default SolutionsMenu;
