"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import UserChatAvatar from "@/components/user-chat-avatar";
import { Channel, Member, Profile } from "@prisma/client";
import axios from "axios";
import { Hash, Loader2 } from "lucide-react";
import qs from "query-string";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaVideo } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { RiPushpinFill } from "react-icons/ri";
import ShortUniqueId from "short-unique-id";
import { MobileToggle } from "../mobile-toggle";
import SettingsBtn from "./settings-btn";
import ToggleMemberBtn from "./toogleMemberBtn";

const uid = new ShortUniqueId({ length: 20 });

type MemberType = Member & {
  profile: Profile;
};

interface Props {
  type: "channel" | "conversation";
  channel?: Channel & {
    members: MemberType[];
    profile: Profile;
  };
  otherMember?: Member & {
    profile: Profile;
  };
  apiUrl: string;
  query: Record<string, any>;
}

const ChatHeader = ({ type, channel, otherMember, apiUrl, query }: Props) => {
  // generate video room url
  const [roomLoading, setCreateLoading] = useState<boolean>(false);

  const createRoom = () => {
    const headers = {
      Authorization: `Bearer ${process.env.SAMBA_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    let body = {
      topic: channel?.name || otherMember?.profile.name,
      friendly_url: uid.rnd(),
      privacy: "public",
      external_id: "myExtID123" + Date.now().toString(),
      default_role: "participant",
      roles: ["participant"],
      topbar_enabled: true,
      toolbar_enabled: true,
      toolbar_position: "right",
      toolbar_color: "#212ce6",
      primary_color: "#1AD391",
      background_color: "#000000",
      palette_mode: "light",
      language: "en",
      captions_language: "en",
      language_selection_enabled: false,
      audio_on_join_enabled: false,
      video_on_join_enabled: false,
      pin_enabled: true,
      full_screen_enabled: true,
      minimize_own_tile_enabled: true,
      minimize_own_tile_on_join_enabled: true,
      end_session_enabled: true,
      chat_enabled: true,
      e2ee_enabled: true,
      layout_mode_switch_enabled: true,
      captions_enabled: false,
      captions_mode: "live_speech",
      simple_notifications_enabled: true,
      join_screen_enabled: true,
      screenshare_enabled: true,
      recordings_enabled: true,
      recording_logo_enabled: true,
      virtual_backgrounds_enabled: true,
      raise_hand_enabled: true,
      participant_names_in_recordings_enabled: true,
      captions_in_recordings_enabled: false,
      recordings_layout_mode: "tiled",
      max_participants: 30,
    };

    setCreateLoading(true);
    axios
      .post(`https://api.digitalsamba.com/api/v1/rooms`, body, {
        headers,
      })
      .then((res) => {
        setCreateLoading(false);
        const roomId = res.data?.friendly_url;
        handleSendRoomUrl(roomId);
      })
      .catch((err) => {
        console.log(err);
        setCreateLoading(false);
      });
  };
  const handleSendRoomUrl = async (roomId: string) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, { message: "", roomId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.Please try again later!");
    }
  };
  return (
    <div className="p-1 fixed top-0 left-0 w-full z-20 md:pl-[292px]">
      <div className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm shadow-[var(--brand-shadow)]">
        <MobileToggle />
        {type === "channel" && <Hash className="w-5 h-5 text-zinc-500" />}
        {type === "conversation" && (
          <UserChatAvatar
            src={otherMember?.profile?.imageUrl}
            isActive={otherMember?.profile?.isActive}
            className="w-8 h-8"
          />
        )}
        <h2 className="text-base tracking-tight text-black font-semibold flex items-center gap-x-1 ml-2">
          {channel?.name || otherMember?.profile?.name}
        </h2>
        <ActionTooltip label="Start video call">
          <Button
            className="w-auto h-auto p-1 ml-auto text-slate-600 mr-2"
            variant="ghost"
            size="icon"
            onClick={createRoom}
          >
            {roomLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <FaVideo className="w-5 h-5" />
            )}
          </Button>
        </ActionTooltip>
        <ActionTooltip label="Notifications">
          <Button
            className="w-auto h-auto p-1 text-slate-600 mr-2"
            variant="ghost"
            size="icon"
          >
            <IoNotifications className="w-5 h-5" />
          </Button>
        </ActionTooltip>
        <ActionTooltip label="Pined Messages">
          <Button
            className="w-auto h-auto p-1 text-slate-600 mr-2"
            variant="ghost"
            size="icon"
          >
            <RiPushpinFill className="w-[22px] h-[22px]" />
          </Button>
        </ActionTooltip>

        <ToggleMemberBtn type={type} />

        {channel && <SettingsBtn chatId={channel.id} type={type} />}
      </div>
    </div>
  );
};

export default ChatHeader;
