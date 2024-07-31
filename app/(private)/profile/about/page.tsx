import { authOptions } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/current-profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileForm from "../_components/profile-form";

export const dynamic = "force-dynamic";

const About = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  const profile = await getCurrentProfile(session);
  return (
    <div className="max-w-4xl">
      <ProfileForm profile={profile} />
    </div>
  );
};

export default About;
