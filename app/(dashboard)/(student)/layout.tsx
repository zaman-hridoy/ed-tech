import BottomNav from "@/components/bottom-nav";
import PrivateNavbar from "@/components/private-navbar";
import { authOptions } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/current-profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GrantCards from "./s/_components/grant-cards";
import SudentDashboardSidebar from "./s/_components/sidebar";

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
      <div className="hidden lg:flex w-[280px] h-full fixed inset-0 pt-16 flex-col">
        <div className="p-4 md:p-6 h-full pr-0 md:pr-0">
          <div className="bg-white h-full rounded-md">
            <SudentDashboardSidebar />
          </div>
        </div>
      </div>
      <main className="h-full pt-14 lg:pt-16 lg:pl-[280px] 2xl:pr-[280px]">
        <div className="p-4 md:p-6 space-y-4">
          <GrantCards />
          {props.children}
        </div>
      </main>
      {/* <div className="hidden lg:flex lg:flex-col w-[280px] bg-white h-full fixed top-0 right-0 pt-14 lg:pt-16 ">
        books
      </div> */}
      <BottomNav profile={profile} />
    </div>
  );
};

export default DriveLayout;
