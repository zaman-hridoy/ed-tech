import BottomNav from "@/components/bottom-nav";
import Container from "@/components/container";
import Footer from "@/components/footer";
import PrivateNavbar from "@/components/private-navbar";
import UserBanner from "@/components/user-banner";
import { authOptions } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/current-profile";
import { SessionWithUserType } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  children: React.ReactNode;
  educator: React.ReactNode;
  student: React.ReactNode;
}

const PrivateLayout = async (props: Props) => {
  const session: SessionWithUserType | null = await getServerSession(
    authOptions
  );

  if (!session) return redirect("/");

  const profile = await getCurrentProfile(session);
  const requiredFields = [
    profile?.address,
    profile?.birthdate,
    profile?.country,
    profile?.state,
  ];

  const isAddedRequiredFields = requiredFields.every(Boolean);

  if (!isAddedRequiredFields) return redirect("/auth/add-info?active_tab=0");

  if (
    session.user.type === "Educator" ||
    session.user.type === "ContentManager"
  ) {
    return (
      <div className="h-full pt-14">
        <PrivateNavbar profile={profile} />
        <UserBanner profile={profile} />
        <Container className="pb-10">
          {/* <div className="px-4 lg:px-6 pb-10 max-w-[1920px] mx-auto"> */}
          {props.educator}
          {/* </div> */}
        </Container>
        <BottomNav profile={profile} />
        <Footer />
      </div>
    );
  } else if (session.user.type === "Student") {
    return (
      <div className="h-full pt-14">
        <PrivateNavbar profile={profile} />
        <UserBanner profile={profile} />
        <Container className="pb-10">
          {/* <div className="px-4 lg:px-6 pb-10 max-w-[1920px] mx-auto"> */}
          {props.student}
          {/* </div> */}
        </Container>
        <BottomNav profile={profile} />
        <Footer />
      </div>
    );
  } else {
    return redirect("/");
  }
};

export default PrivateLayout;
