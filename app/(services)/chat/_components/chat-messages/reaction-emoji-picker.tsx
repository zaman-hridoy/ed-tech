"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker from "emoji-picker-react";

type EmojiType = {
  emoji: string;
  unified: string;
  name: string;
};

interface Props {
  onEmojiSelect: (emoji: EmojiType) => void;
  children: React.ReactNode;
  onOpenChange: (status: boolean) => void;
}

function ReactionEmojiPicker({ onEmojiSelect, children, onOpenChange }: Props) {
  return (
    <Popover onOpenChange={onOpenChange} modal={false}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-auto" side="top" align="end">
        <EmojiPicker
          onEmojiClick={(emoji) => {
            const name = emoji.names[emoji.names.length - 1];
            onEmojiSelect({ emoji: emoji.emoji, unified: emoji.unified, name });
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default ReactionEmojiPicker;
