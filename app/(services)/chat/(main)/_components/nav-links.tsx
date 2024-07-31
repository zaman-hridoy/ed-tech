"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const NavLink = () => {
  const pathname = usePathname();
  return (
    <Fragment>
      {navLinks.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={cn(
            "text-base text-slate-500 font-semibold",
            pathname === item.link && "text-[var(--brand-color)]"
          )}
        >
          {item.name}
        </Link>
      ))}
    </Fragment>
  );
};

export default NavLink;

const navLinks = [
  {
    name: "Books",
    link: "/chat/books",
  },
  {
    name: "People",
    link: "/chat/people",
  },
  {
    name: "Channels",
    link: "/chat/public-channels",
  },
];
