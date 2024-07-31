import { db } from "@/lib/db";
import { getPageChatProfile } from "@/lib/get-page-chat-profile";
import { NextApiResponseWithServerIO } from "@/lib/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithServerIO
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const profile = await getPageChatProfile(req, res);

    if (!profile) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { message } = req.body;
    const { conversationId } = req.query;
    if (!conversationId) {
      return res.status(401).json({ message: "Conversation ID missing" });
    }
    if (!message) {
      return res.status(401).json({ message: "Message is empty" });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: +conversationId,
        OR: [
          {
            memberOneProfileId: profile.id,
          },
          {
            memberTwoProfileId: profile.id,
          },
        ],
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const currentProfileId =
      conversation.memberOneProfileId === profile.id
        ? conversation.memberOneProfileId
        : conversation.memberTwoProfileId;

    const members = conversation.members;
    const member = members.find(
      (member) => member.profileId === currentProfileId
    );
    if (!member) {
      return res.status(404).json({ message: "member not found" });
    }

    const createdMessage = await db.directMessage.create({
      data: {
        content: message,
        memberId: member.id,
        conversationId: +conversationId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
        reaction: {
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    const channelKey = `conversation:${conversationId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, createdMessage);

    return res.status(200).json(createdMessage);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
