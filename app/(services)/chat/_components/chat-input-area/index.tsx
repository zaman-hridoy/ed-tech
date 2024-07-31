"use client";

import { Member, Profile } from "@prisma/client";
import axios from "axios";
import qs from "query-string";
import { useState } from "react";
import toast from "react-hot-toast";
import ChatInput from "../chat-input";

type MemberWithProfile = Member & {
  profile: Profile;
};

interface Props {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
  members: MemberWithProfile[];
}

function stripHtmlTags(html: any) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const ChatInputArea = ({ apiUrl, query, name, type, members }: Props) => {
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (message: string) => {
    const parsedString = stripHtmlTags(message);
    if (parsedString.length === 0) {
      return;
    }

    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, { message });
      setContent("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.Please try again later!");
    }
  };

  const placeholder = type === "channel" ? `Message #${name}` : "Message";

  return (
    <div className="px-4">
      <ChatInput
        value={content}
        members={members}
        placeholder={placeholder}
        onChange={(val) => setContent(val)}
        onPressShiftPlusEnterKey={(val) => handleSubmit(val)}
      />
    </div>
  );
};

export default ChatInputArea;
