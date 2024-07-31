import { getProfileById } from "@/actions/get-profile-by-id";
import { redirect } from "next/navigation";
import ProfileForm from "../_components/profile-form";

const About = async ({
  params,
}: {
  params: { userId: string; username: string };
}) => {
  const profile = await getProfileById(+params.userId);
  if (!profile) {
    return redirect(`/${params.username}/${params.userId}/not-found`);
  }
  return (
    <div className="max-w-4xl">
      <ProfileForm profile={profile} />
    </div>
  );
};

export default About;
