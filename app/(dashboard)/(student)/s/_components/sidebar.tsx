"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BookOpenCheck,
  GanttChartSquare,
  History,
  ListOrdered,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineAnnotation } from "react-icons/hi";

const sidebarNavItems = [
  {
    title: "Dashbaord",
    href: "/s/dashboard",
    icon: <GanttChartSquare className="w-5 h-5" />,
  },
  {
    title: "E-books",
    href: "/s/dashboard/ebooks",
    icon: <BookOpenCheck className="w-5 h-5" />,
  },
  {
    title: "Grant History",
    href: "/s/dashboard/histories",
    icon: <History className="w-5 h-5" />,
  },
  {
    title: "My Orders",
    href: "/s/dashboard/orders",
    icon: <ListOrdered className="w-5 h-5" />,
  },
  {
    title: "Annotated Contents",
    href: "/s/dashboard/annotated-contents",
    icon: <HiOutlineAnnotation className="w-5 h-5" />,
  },
];

const SudentDashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex space-x-2 w-full  lg:flex-col lg:space-x-0 lg:space-y-1 bg-white rounded-md p-2 overflow-x-auto no-scrollbar select-none">
      {sidebarNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({
              variant: pathname === item.href ? "primary" : "ghost",
            }),
            "text-base gap-x-2 font-bold tracking-tight py-1 justify-start"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default SudentDashboardSidebar;
