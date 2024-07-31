import { getFollowersById } from "@/actions/get-followers-by-id";
import { getFollowingById } from "@/actions/get-following-by-id";
import FollowUserCard from "@/components/follow-user-card";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { FollowUserType } from "@/lib/types";
import { getServerSession } from "next-auth";
import { FaUsers } from "react-icons/fa6";

export const dynamic = "force-dynamic";

const FollowersPage = async ({
  params,
}: {
  params: { userId: string; username: string };
}) => {
  const session = await getServerSession(authOptions);
  const users = await getFollowersById(+params.userId);
  let myFollowing: FollowUserType[] = [];
  if (session) {
    myFollowing = await getFollowingById(session?.user?.userId!);
  }

  const isFollowing = (userId: string) => {
    return myFollowing.some((user) => user.userId === userId);
  };

  return (
    <div>
      <div className="flex items-center gap-x-2 text-slate-600 tracking-tighter text-xl font-semibold">
        <FaUsers className="w-5 h-5" />
        <span>Followers</span>
        <span className="text-sm">({users.length})</span>
      </div>
      <Separator className="mb-2 mt-1" />
      <div className="max-w-4xl">
        <div className="w-full grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-2">
          {users.map((user) => (
            <FollowUserCard
              key={user.userId}
              user={user}
              isFollowing={isFollowing(user.userId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default FollowersPage;
