import BottomNav from "@/components/bottom-nav";
import Container from "@/components/container";
import Footer from "@/components/footer";
import PrivateNavbar from "@/components/private-navbar";
import UserBanner from "@/components/user-banner";
import { authOptions } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/current-profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  children: React.ReactNode;
}

const PrivateLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");
  const profile = await getCurrentProfile(session);

  return (
    <div className="h-full pt-12">
      <PrivateNavbar profile={profile} />
      <UserBanner profile={profile} />
      <Container className="pb-10">{props.children}</Container>
      <BottomNav profile={profile} />
      <Footer />
    </div>
  );
};

export default PrivateLayout;
