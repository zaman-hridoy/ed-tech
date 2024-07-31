import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { CopyIcon, Trash2 } from "lucide-react";
import { BsFlagFill } from "react-icons/bs";
import { FaReply } from "react-icons/fa6";
import { RiSpeakFill } from "react-icons/ri";

interface Props {
  children: React.ReactNode;
  onOpenChange: (status: boolean) => void;
  messageId: number;
  socketUrl: string;
  socketQuery: Record<string, number>;
  isOwner: boolean;
  onSpeakMessage: () => void;
  onCopyMessage: () => void;
}

export function MessageOptions({
  children,
  onOpenChange,
  messageId,
  socketUrl,
  socketQuery,
  isOwner,
  onSpeakMessage,
  onCopyMessage,
}: Props) {
  const modal = useModal();
  return (
    <DropdownMenu onOpenChange={onOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" side="left" align="start">
        <DropdownMenuLabel>
          <ActionTooltip label="Face_with_monocle">
            <Button
              className="rounded-full text-xl"
              variant="ghost"
              size="icon"
            >
              🧐
            </Button>
          </ActionTooltip>
          <ActionTooltip label="Thumbs_up">
            <Button
              className="rounded-full text-xl"
              variant="ghost"
              size="icon"
            >
              👍
            </Button>
          </ActionTooltip>
          <ActionTooltip label="Open_mouth">
            <Button
              className="rounded-full text-xl"
              variant="ghost"
              size="icon"
            >
              😮
            </Button>
          </ActionTooltip>
          <ActionTooltip label="Joy">
            <Button
              className="rounded-full text-xl"
              variant="ghost"
              size="icon"
            >
              😂
            </Button>
          </ActionTooltip>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              Add Reaction
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="cursor-pointer">
                  Face_with_monocle
                  <DropdownMenuShortcut className="opacity-100 ml-1">
                    🧐
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Thinkin_face
                  <DropdownMenuShortcut className="opacity-100 ml-1">
                    🤔
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Thumbs_up
                  <DropdownMenuShortcut className="opacity-100 ml-1">
                    👍
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  More...
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            Reply
            <DropdownMenuShortcut>
              <FaReply className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onCopyMessage}>
            Copy Text
            <DropdownMenuShortcut>
              <CopyIcon className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onSpeakMessage}>
            Speak Message
            <DropdownMenuShortcut>
              <RiSpeakFill className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {isOwner ? (
          <DropdownMenuItem
            onClick={() =>
              modal.onModalOpen("DELETE_MESSAGE_MODAL", {
                socketUrl: `${socketUrl}/${messageId}`,
                socketQuery,
              })
            }
            className="text-rose-500 cursor-pointer focus:text-rose-500"
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2 className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="text-rose-500 cursor-pointer focus:text-rose-500">
            Report Message
            <DropdownMenuShortcut>
              <BsFlagFill className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
