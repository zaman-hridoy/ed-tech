import { Separator } from "@/components/ui/separator";
import UserChatAvatar from "@/components/user-chat-avatar";
import { Member, Profile } from "@prisma/client";
import { format } from "date-fns";

interface Props {
  otherMember: Member & {
    profile: Profile;
  };
}

const ConversationInfo = ({ otherMember }: Props) => {
  return (
    <div className="fixed top-0 right-0 w-72 h-full z-10 pt-14 pr-1">
      <div className="bg-white h-full rounded-lg shadow-lg shadow-[var(--brand-shadow)] space-y-4 overflow-y-auto no-scrollbar">
        <div className="aspect-video bg-indigo-600 relative">
          <div className="absolute -bottom-8 left-4">
            <UserChatAvatar
              src={otherMember.profile.imageUrl}
              className="w-16 h-16 border-4"
              isActive={otherMember.profile.isActive}
              dotClassName="bottom-1 right-1"
            />
          </div>
        </div>
        <div className="pt-10 px-4 pb-4">
          <h2 className="text-base text-slate-800 font-semibold">
            {otherMember.profile.name}
          </h2>
          <p className="text-sm text-zinc-500 font-medium">
            {otherMember.profile.role}
          </p>

          <Separator className="my-4" />
          <h2 className="text-sm uppercase text-slate-800 font-semibold">
            SimpliTaught member since
          </h2>
          <p className="text-sm text-zinc-500 font-medium">
            {format(new Date(otherMember.profile.createdAt), "MMM ddd, yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationInfo;
