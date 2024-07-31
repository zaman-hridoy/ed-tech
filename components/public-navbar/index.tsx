"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useSticky } from "@/hooks/useSticky";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import GlobalSearch from "../global-search";
import Logo from "./logo";
import MobileSidebar from "./mobile-sidebar";
import SolutionsMenu from "./solutions-menu";

const navItems = [
  {
    label: "What is ST?",
    href: "/what-is-st",
  },
  {
    label: "Books",
    href: "/text-books",
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

const PublicNavbar = () => {
  const [visible, setVisible] = useState(false);
  const { isSticky } = useSticky();

  return (
    <div className="fixed top-0 left-0 z-30 w-full">
      <Container
        className={cn(
          "bg-white rounded-md py-4 rounded-bl-2xl rounded-br-2xl",
          isSticky && "shadow-md"
        )}
      >
        <nav className="w-full relative">
          <div className="flex flex-row items-center justify-between gap-x-4 md:gap-x-6">
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

            <div className="flex items-center gap-x-3 lg:ml-auto">
              <div className="lg:flex items-center gap-x-8 hidden">
                <SolutionsMenu onVisible={setVisible} />
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`
                inline-block py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base
                before:absolute before:w-0 before:h-[3px] before:bg-[#212CE6] before:bottom-1
                hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
              `}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="md:w-[200px] ml-2">
                  <GlobalSearch />
                </div>
              </div>
              <div className="lg:hidden">
                <GlobalSearch />
              </div>
              <div className="w-[1px] h-3 bg-primary lg:mr-4" />
              <Button
                variant="outline"
                asChild
                size="sm"
                className="lg:w-[80px] border-[var(--brand-color)] rounded-full bg-transparent hover:bg-[var(--brand-color)] hover:text-white transition-all"
              >
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
      </Container>
    </div>
  );
};

export default PublicNavbar;
