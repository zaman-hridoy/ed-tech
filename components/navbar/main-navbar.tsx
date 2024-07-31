"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";
import MobileSidebar from "./mobile-sidebar";
import NavSearch from "./nav-search";
import SolutionsMenu from "./solutions-menu";

const navItems = [
  {
    label: "What is ST?",
    href: "/what-is-st",
  },
  {
    label: "Platform",
    href: "/platform",
  },
  {
    label: "About Us",
    href: "/about",
  },
];

const MainNavbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="w-full xl:px-10 relative">
      <div className="relative px-4 py-2 border border-t-0 border-b-0 lg:px-10 lg:py-4 shadow-md shadow-blue-50 rounded-md flex flex-row items-center justify-between gap-x-4 md:gap-x-6 bg-white">
        <div className="hidden lg:block">
          <Logo />
        </div>
        <MobileSidebar side="left">
          <Button
            variant="ghost"
            className="font-semibold lg:hidden shrink-0"
            size="icon"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </MobileSidebar>

        {/* <div className="block lg:hidden w-full sm:w-[250px]">
          <NavSearch />
        </div> */}
        <div className="flex items-center gap-x-3 lg:ml-auto">
          <div className="lg:flex items-center gap-x-0 hidden">
            <SolutionsMenu onVisible={setVisible} />
            {navItems.map((item) => (
              <Button
                key={item.label}
                asChild
                variant="ghost"
                className="font-semibold"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <div className="md:w-[200px] ml-2">
              <NavSearch />
            </div>
          </div>
          <div className="lg:hidden">
            <NavSearch />
          </div>
          <div className="w-[1px] h-3 bg-primary lg:mr-4" />
          <Button variant="primary" asChild size="sm" className="lg:w-[80px]">
            <Link href="/auth/signin">Sign in</Link>
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "absolute top-full left-0 w-full xl:px-10 invisible",
          visible && "visible"
        )}
      >
        <div className="bg-[#F9F9FD] w-full min-h-[210px] shadow-md" />
      </div>
    </nav>
  );
};

export default MainNavbar;
