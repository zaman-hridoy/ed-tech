import { redirect } from "next/navigation";

const ProfilePage = async () => {
  return redirect("/profile/about");
};

export default ProfilePage;
