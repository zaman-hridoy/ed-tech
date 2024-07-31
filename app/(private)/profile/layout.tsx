import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { SidebarNav } from "./_components/sidebar-navs";

export const dynamic = "force-dynamic";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile/about",
  },
  {
    title: "Institution",
    href: "/profile/institution",
  },
  {
    title: "Draft Courses",
    href: "/profile/draft-courses",
  },
  {
    title: "Active Courses",
    href: "/profile/active-courses",
  },
  {
    title: "Completed Courses",
    href: "/profile/completed-courses",
  },
  {
    title: "Following",
    href: "/profile/following",
  },
  {
    title: "Followers",
    href: "/profile/followers",
  },
];

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  let navItems = [...sidebarNavItems];
  if (session.user.type === "Student") {
    navItems = navItems.filter((item) => item.title !== "Draft Courses");
  }

  return (
    <>
      <div className="space-y-6 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0">
          <SidebarNav items={navItems} />

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
