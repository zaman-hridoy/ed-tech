import BottomNav from "@/components/bottom-nav";
import Footer from "@/components/footer";
import PrivateNavbar from "@/components/private-navbar";
import PublicNavbar from "@/components/public-navbar";
import { authOptions } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/current-profile";
import { getServerSession } from "next-auth";
import React from "react";

export const dynamic = "force-dynamic";

interface Props {
  children: React.ReactNode;
}

const MarketingLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    const profile = await getCurrentProfile(session);
    return (
      <div>
        <PrivateNavbar profile={profile} />
        {children}
        <BottomNav profile={profile} />
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <PublicNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default MarketingLayout;
