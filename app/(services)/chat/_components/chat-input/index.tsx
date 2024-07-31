"use client";

import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { Member, Profile } from "@prisma/client";
import { AtSign, Plus } from "lucide-react";
import { matchSorter } from "match-sorter";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GiPlainCircle } from "react-icons/gi";
import ExpandableInput from "../expandable-input";
import GifEmojiPicker from "./gif-emoji-picker";

type MemberWithProfile = Member & {
  profile: Profile;
};

interface Props {
  members: MemberWithProfile[];
  onChange: (value: string) => void;
  onPressShiftPlusEnterKey: (value: string) => void;
  value: string;
  showUploadBtn?: boolean;
  placeholder?: string;
}

const ChatInput = ({
  value,
  onChange,
  onPressShiftPlusEnterKey,
  members,
  showUploadBtn = true,
  placeholder = "",
}: Props) => {
  const session = useSession();
  const [openMention, setOpenMention] = useState(false);
  const [mentionUsers, setmentionUsers] =
    useState<MemberWithProfile[]>(members);

  const onSelectMentionedUser = (member: MemberWithProfile) => {
    // Check if the current content includes a mention
    const match = value.match(/@(\w+)/g);
    if (match) {
      // Replace the mention with bold text
      const mentionedUser = match[0];

      const mentionBox = (
        <span contentEditable={false}>
          <span
            role="button"
            className="bg-indigo-200/50 text-indigo-500 inline-block rounded-md px-1 mx-1"
            data-id={member.id}
            tabIndex={member.id}
            contentEditable={false}
          >
            <span className="flex items-center">
              <AtSign className="w-3 h-3 text-inherit" />
              <span className="ml-1">{member.profile.name}</span>
            </span>
          </span>
        </span>
      );

      const htmlString = renderToStaticMarkup(mentionBox);

      const formattedContent = value.replace(`${mentionedUser}`, htmlString);

      // console.log({ match, mentionedUser, formattedContent });

      // Set the formatted content back to the contenteditable div
      onChange(formattedContent);
      setOpenMention(false);
    }
  };

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Enter" && e.shiftKey) {
  //       e.preventDefault();
  //       console.log({ e: content });
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

  const handleFilterMember = (query: string) => {
    const filteredMembers = matchSorter(members, query, {
      keys: ["profile.name"],
    });
    setmentionUsers(filteredMembers);
  };

  return (
    <div className="border rounded-md bg-zinc-200">
      <div className={cn("relative pl-4 py-3 pr-10", showUploadBtn && "pl-10")}>
        {/* mention popup */}
        <div
          className={cn(
            "hidden absolute z-30 bottom-full left-0 w-full bg-zinc-100 py-4 rounded-md",
            openMention && !!mentionUsers.length && "block transition-all"
          )}
        >
          {mentionUsers.map((member) => (
            <span
              key={member.id}
              className="flex w-full items-center gap-x-2 px-4 py-2 transition text-slate-700 tracking-tighter font-semibold cursor-pointer hover:bg-zinc-200/50"
              onClick={() => onSelectMentionedUser(member)}
            >
              <UserAvatar className="h-8 w-8" src={member.profile.imageUrl} />
              <GiPlainCircle
                className={cn(
                  "w-3 h-3 shrink-0 text-slate-300",
                  member.profile.isActive && "text-green-500"
                )}
              />
              <span className="truncate text-inherit">
                {member.profile.name}{" "}
                {session?.data?.user.userId === member.profile.userId && (
                  <span>(you)</span>
                )}
              </span>
            </span>
          ))}
        </div>
        {showUploadBtn && (
          <button
            type="button"
            className="absolute top-[10px] left-2 h-[24px] w-[24px]
            bg-zinc-400 hover:bg-zinc-500
            transition rounded-full p-1
            flex items-center justify-center
            hover:text-white"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}

        <div className="max-h-[40vh] overflow-y-auto no-scrollbar cursor-text">
          <ExpandableInput
            content={value}
            onChange={(val) => onChange(val)}
            placeholder={placeholder}
            onOpenMention={(open) => setOpenMention(open)}
            onFilterMention={handleFilterMember}
            submitOnEnter={(val) => onPressShiftPlusEnterKey(val)}
          />
        </div>

        <GifEmojiPicker
          onEmojiSelect={(emoji) => {
            const newMessage = value + emoji;
            onChange(newMessage);
          }}
        />
      </div>
    </div>
  );
};

export default ChatInput;
