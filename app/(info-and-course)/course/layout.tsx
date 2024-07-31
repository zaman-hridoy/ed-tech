import { authOptions } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/current-profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import CollectionNav from "../_components/collection-nav";
import DndContextProvider from "./_components/dnd-context-provider";

export const dynamic = "force-dynamic";

const CollectionLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const profile = await getCurrentProfile(session);

  if (!profile) {
    return redirect("/");
  }

  return (
    <div className="h-full flex flex-col">
      <CollectionNav profile={profile} />
      <DndContextProvider>{children}</DndContextProvider>
    </div>
  );
};

export default CollectionLayout;
