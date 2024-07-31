import { getFollowingById } from "@/actions/get-following-by-id";
import FollowUserCard from "@/components/follow-user-card";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaUsers } from "react-icons/fa6";

export const dynamic = "force-dynamic";

const FollowingPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const users = await getFollowingById(session.user?.userId);

  return (
    <div>
      <div className="flex items-center gap-x-2 text-slate-600 tracking-tighter text-base font-semibold">
        <FaUsers className="w-5 h-5" />
        <span>Following</span>
        <span className="text-sm">({users.length})</span>
      </div>
      <Separator className="mb-2 mt-1" />
      <div className="max-w-4xl">
        <div className="w-full grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-2">
          {users.map((user) => (
            <FollowUserCard key={user.userId} user={user} isFollowing={true} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default FollowingPage;
