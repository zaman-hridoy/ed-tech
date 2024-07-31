"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
// import { PiGifFill } from "react-icons/pi";

interface Props {
  onEmojiSelect: (emoji: string) => void;
}

function GifEmojiPicker({ onEmojiSelect }: Props) {
  return (
    <Popover>
      <div className="absolute right-[6px] top-[8px] flex items-center gap-x-1">
        {/* <PopoverTrigger asChild>
          <Button className="w-auto h-auto p-[2px]" variant="ghost">
            <PiGifFill className="w-6 h-6" />
          </Button>
        </PopoverTrigger> */}

        <PopoverTrigger asChild>
          <Button
            className="w-auto h-auto p-[2px] rounded-full"
            variant="ghost"
          >
            <Smile className="w-6 h-6" />
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent className="p-0 w-auto" side="top" align="end">
        <Tabs defaultValue="emoji" className="w-full h-full flex flex-col">
          <TabsList className="w-full flex items-center justify-start gap-x-4 px-4">
            <TabsTrigger
              value="gif"
              className="data-[state=active]:bg-[var(--brand-color)] data-[state=active]:text-white text-[10px] xl:text-xs font-semibold tracking-tight p-1"
            >
              GIFs
            </TabsTrigger>
            <TabsTrigger
              value="emoji"
              className="data-[state=active]:bg-[var(--brand-color)] data-[state=active]:text-white text-[10px] xl:text-xs font-semibold tracking-tight p-1"
            >
              Emoji
            </TabsTrigger>
          </TabsList>
          {/* <TabsContent value="gif" className="h-full pb-10">
            <GifPicker tenorApiKey={"LIVDSRZULELA"} />
          </TabsContent> */}
          <TabsContent value="emoji">
            <EmojiPicker onEmojiClick={(emoji) => onEmojiSelect(emoji.emoji)} />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

export default GifEmojiPicker;
