"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import UserChatAvatar from "@/components/user-chat-avatar";
import { groupByDataKey } from "@/lib/helper-methods";
import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Reaction } from "@prisma/client";
import axios from "axios";
import parse from "html-react-parser";
import { MoreVertical, ShieldAlert, ShieldCheck } from "lucide-react";
import qs from "query-string";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegSmile, FaReply } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import ChatInput from "../chat-input";
import { EmojiHoverInfo } from "./emoji-hover-info";
import { MessageOptions } from "./message-option";
import ReactionEmojiPicker from "./reaction-emoji-picker";

type MemberWithProfile = Member & {
  profile: Profile;
};

type ReactionType = Reaction & {
  member: Member & {
    profile: Profile;
  };
};

function stripHtmlTags(html: any) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

interface Props {
  id: number;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  isDeleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, any>;
  members: MemberWithProfile[];
  reaction: ReactionType[];
}

type EmojiType = {
  emoji: string;
  unified: string;
  name: string;
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  isDeleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
  members,
  reaction,
}: Props) => {
  const [openedOptions, setOpenedOptions] = useState(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;

  const canDeleteMessage = !isDeleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !isDeleted && isOwner;

  const [editedContent, setEditedContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setEditedContent("");
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onSubmit = async (message: string) => {
    const parsedString = stripHtmlTags(message);
    if (parsedString.length === 0) {
      return;
    }
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, { message });

      setEditedContent("");
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onReaction = async (emoji: EmojiType) => {
    if (!emoji) return;

    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}/reaction`,
        query: socketQuery,
      });

      await axios.post(url, {
        emoji: emoji.emoji,
        unified: emoji.unified,
        name: emoji.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOnReactedEmoji = (reactions: ReactionType[]) => {
    console.log({ reactions });
  };

  const onCopyMessage = (message: string) => {
    const parsedString = stripHtmlTags(message);
    navigator.clipboard.writeText(parsedString);
    toast.success("Message Copied");
  };

  const onSpeakMessage = (message: string) => {
    const parsedString = stripHtmlTags(message);
    let script = "";
    if (parsedString.length === 0) {
      script = "There is no valid message.";
    } else {
      script = parsedString;
    }
    const synth = window.speechSynthesis;
    const text = new SpeechSynthesisUtterance(script);
    // const voices = synth.getVoices();
    // const desiredVoice = voices.find(
    //   (voice) => voice.name === "Reed (English (United Kingdom))"
    // );
    // if (desiredVoice) {
    //   text.voice = desiredVoice;
    // }
    synth.speak(text);
  };

  const reactionByUnified = groupByDataKey(reaction, "unified");

  return (
    <div className="relative group flex items-center hover:bg-slate-200/50 transition px-4 py-2 w-full cursor-pointer">
      <div className="group flex items-start gap-x-2 w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserChatAvatar
            src={member.profile.imageUrl}
            isActive={member.profile.isActive}
            className="w-10 h-10"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2 select-none">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500">{timestamp}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium tracking-tight select-none">
            {member.profile.role}
          </span>

          {!isEditing && (
            <p
              className={cn(
                "text-sm tracking-tight font-medium text-zinc-600 mt-2 whitespace-break-spaces cursor-text",
                isDeleted &&
                  "italic text-zinc-500 text-xs bg-zinc-100 w-fit px-3 py-1 rounded-full"
              )}
            >
              {parse(`${content}`)}
              {isUpdated && !isDeleted && (
                <span className="text-[10px] mx-2">(edited)</span>
              )}
            </p>
          )}

          {!isEditing &&
            !isDeleted &&
            Object.keys(reactionByUnified).length > 0 && (
              <div className="space-x-1 mt-2">
                {Object.keys(reactionByUnified).map((key) => (
                  <EmojiHoverInfo key={key} reactions={reactionByUnified[key]}>
                    <button
                      className="bg-indigo-200/50 px-[6px] py-[2px] text-sm rounded-md text-[var(--brand-color)] font-medium"
                      onClick={() =>
                        handleClickOnReactedEmoji(reactionByUnified[key])
                      }
                    >
                      {reactionByUnified[key]?.[0].emoji}{" "}
                      {reactionByUnified[key]?.length ?? 0}
                    </button>
                  </EmojiHoverInfo>
                ))}
              </div>
            )}

          {isEditing && (
            <div className="mt-2">
              <ChatInput
                value={editedContent}
                members={members}
                onChange={(val) => setEditedContent(val)}
                onPressShiftPlusEnterKey={(val) => onSubmit(val)}
                showUploadBtn={false}
              />
              <span className="text-xs mt-1 text-zinc-500">
                Press escape to{" "}
                <span
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent("");
                  }}
                  className="text-[var(--brand-color)] hover:underline font-semibold"
                >
                  cancel
                </span>
                , enter to{" "}
                <span
                  onClick={() => onSubmit(content)}
                  className="text-[var(--brand-color)] hover:underline font-semibold"
                >
                  save
                </span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* {synth.speaking && (
        <div
          className={cn(
            "bg-white transition-all duration-500 focus:block focus-visible:block group-hover:block absolute top-0 right-2 drop-shadow-md"
          )}
        >
          <Button variant="primary" size="icon">
            <RiSpeakFill />
          </Button>
        </div>
      )} */}

      {/* reaction */}
      {!isDeleted && (
        <div
          className={cn(
            "bg-white transition-all duration-500 focus:block focus-visible:block hidden group-hover:block absolute top-0 right-2 drop-shadow-md",
            (openedOptions || openEmojiPicker) && "block"
          )}
        >
          <div className="flex items-center gap-x-1 p-[2px] rounded-md">
            <ActionTooltip label="Add reaction">
              <ReactionEmojiPicker
                onEmojiSelect={onReaction}
                onOpenChange={(open) =>
                  setTimeout(() => setOpenEmojiPicker(open), 300)
                }
              >
                <Button
                  className="w-auto h-auto p-1 text-zinc-500"
                  variant="ghost"
                  onClick={() => setOpenEmojiPicker(true)}
                >
                  <FaRegSmile className="w-4 h-4" />
                </Button>
              </ReactionEmojiPicker>
            </ActionTooltip>
            <ActionTooltip label="Reply">
              <Button
                className="w-auto h-auto p-1 text-zinc-500"
                variant="ghost"
              >
                <FaReply className="w-4 h-4" />
              </Button>
            </ActionTooltip>
            {isOwner && (
              <ActionTooltip label="Edit">
                <Button
                  className="w-auto h-auto p-1 text-zinc-500"
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(true);
                    setEditedContent(content);
                  }}
                >
                  <FiEdit3 className="w-4 h-4" />
                </Button>
              </ActionTooltip>
            )}

            <ActionTooltip label="Edit">
              <MessageOptions
                onOpenChange={(open) =>
                  setTimeout(() => setOpenedOptions(open), 300)
                }
                messageId={id}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                isOwner={isOwner}
                onCopyMessage={() => onCopyMessage(content)}
                onSpeakMessage={() => onSpeakMessage(content)}
              >
                <Button
                  className="w-auto h-auto p-1 text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  variant="ghost"
                  onClick={() => setOpenedOptions(true)}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </MessageOptions>
            </ActionTooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
