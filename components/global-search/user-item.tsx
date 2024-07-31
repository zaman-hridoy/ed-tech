import UserAvatar from "@/components/user-avatar";
import { usernameToSlug } from "@/lib/helper-methods";
import Link from "next/link";

type SearchUserType = {
  id: number;
  name: string;
  image: string;
  role: string;
};

interface Props {
  user: SearchUserType;
}

const UserItem = ({ user }: Props) => {
  return (
    <Link
      href={`/${usernameToSlug(user.name)}/${user.id}`}
      //   onSelect={() => console.log({ id, type })}
      className="cursor-pointer flex items-center gap-x-2 rounded-md w-full hover:bg-slate-100 transition px-4 py-2"
    >
      <UserAvatar src={user.image} className="w-10 h-10 object-cover" />
      <div className="flex flex-col items-start">
        <h4 className="text-sm text-[var(--brand-color)] tracking-tight font-semibold">
          {user.name}
        </h4>
        <span className="text-xs text-slate-500 tracking-tighter">
          <strong>{user.role}</strong>
        </span>
      </div>
    </Link>
  );
};

export default UserItem;
