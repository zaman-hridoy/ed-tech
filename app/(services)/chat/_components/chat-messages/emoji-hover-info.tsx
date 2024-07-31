import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Member, Profile, Reaction } from "@prisma/client";

type ReactionType = Reaction & {
  member: Member & {
    profile: Profile;
  };
};

interface Props {
  children: React.ReactNode;
  reactions: ReactionType[];
}

export function EmojiHoverInfo({ children, reactions }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-auto max-w-xs" side="top">
        <div className="flex justify-between space-x-2">
          <div>
            <span className="text-4xl">{reactions?.[0]?.emoji}</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm">:{reactions?.[0]?.name}: reacted by</p>
            <div className="space-x-1 space-y-1">
              {reactions.map((react) => (
                <span
                  key={react.id}
                  className="text-xs font-semibold tracking-tight bg-zinc-200 rounded-full px-[6px] py-[2px]"
                >
                  {react.member.profile.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
