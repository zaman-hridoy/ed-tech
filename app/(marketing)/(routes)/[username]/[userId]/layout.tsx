import { getProfileById } from "@/actions/get-profile-by-id";
import { SidebarNav } from "@/app/(private)/profile/_components/sidebar-navs";
import Container from "@/components/container";
import NotFound from "@/components/not-found";
import UserBanner from "@/components/user-banner";
import React from "react";

const ProfileLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    userId: string;
    username: string;
  };
}) => {
  const profile = await getProfileById(+params.userId);
  const sidebarNavItems = [
    {
      title: "Profile",
      href: `/${params.username}/${params.userId}/about`,
    },
    {
      title: "Institution",
      href: `/${params.username}/${params.userId}/institution`,
    },
    {
      title: "Active Courses",
      href: `/${params.username}/${params.userId}/active-courses`,
    },
    // {
    //   title: "Completed Courses",
    //   href: `/${params.username}/${params.userId}/completed-courses`,
    // },
    {
      title: "Following",
      href: `/${params.username}/${params.userId}/following`,
    },
    {
      title: "Followers",
      href: `/${params.username}/${params.userId}/followers`,
    },
  ];
  let navItems = [...sidebarNavItems];
  if (profile?.role === "Student") {
    navItems = navItems.filter((item) => item.title !== "Active Courses");
  }

  if (!profile) {
    return <NotFound />;
  }

  return (
    <>
      <UserBanner profile={profile} showUploadIcon={false} />
      <Container>
        <div className="lg:pb-10 pb-16 md:block">
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0">
            <SidebarNav items={navItems} />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProfileLayout;
