import BottomNav from "@/components/bottom-nav";
import PrivateNavbar from "@/components/private-navbar";
import { authOptions } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/current-profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PreviewSection from "./_components/preview-section";
import TreeSidebar from "./_components/tree-sidebar";

export const dynamic = "force-dynamic";

interface Props {
  children: React.ReactNode;
}

const DriveLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  const profile = await getCurrentProfile(session);

  return (
    <div className="h-full">
      <PrivateNavbar profile={profile} />
      <div className="hidden lg:flex w-[320px] bg-white h-full fixed inset-0  pt-16">
        <TreeSidebar />
      </div>
      <main className="h-full pt-14 lg:pt-16 lg:pl-[320px] lg:pr-[280px]">
        {props.children}
      </main>
      <div className="hidden lg:flex lg:flex-col w-[280px] bg-white h-full fixed top-0 right-0 pt-14 lg:pt-16 ">
        <PreviewSection />
      </div>
      <BottomNav profile={profile} />
    </div>
  );
};

export default DriveLayout;
