import { redirect } from "next/navigation";

const PublicUserPage = async ({
  params,
}: {
  params: { userId: string; username: string };
}) => {
  return redirect(`/${params.username}/${params.userId}/about`);
};

export default PublicUserPage;
