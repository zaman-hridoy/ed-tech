import { authOptions } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/current-profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import AuthNav from "../../_components/auth-nav";

export const dynamic = "force-dynamic";

const AddInfoLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  const profile = await getCurrentProfile(session);
  return (
    <div className="h-full flex flex-col">
      <AuthNav profile={profile} />
      <main className="h-full pt-16">{children}</main>
    </div>
  );
};

export default AddInfoLayout;
