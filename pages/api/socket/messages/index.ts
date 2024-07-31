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

    const { message, roomId } = req.body;
    const { channelId } = req.query;
    if (!channelId) {
      return res.status(401).json({ message: "Channel ID missing" });
    }
    if (!message) {
      return res.status(401).json({ message: "Message is empty" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: +channelId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const memebr = channel.members.find(
      (member) => member.profileId === profile.id
    );
    if (!memebr) {
      return res.status(404).json({ message: "member not found" });
    }

    const createdMessage = await db.message.create({
      data: {
        content: message,
        memberId: memebr.id,
        channelId: +channelId,
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
        embeds: true,
      },
    });

    if (roomId) {
      await db.embeds.create({
        data: {
          messageId: createdMessage.id,
          type: "CONFERENCE_ROOM",
          url: roomId,
        },
      });
    }

    const channelKey = `channel:${channelId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, createdMessage);

    return res.status(200).json(createdMessage);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
