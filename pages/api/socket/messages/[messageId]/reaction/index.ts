import { db } from "@/lib/db";
import { getPageChatProfile } from "@/lib/get-page-chat-profile";
import { NextApiResponseWithServerIO } from "@/lib/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithServerIO
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method is not allowed" });
  }

  try {
    const profile = await getPageChatProfile(req, res);
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { channelId, messageId } = req.query;
    const { emoji, name, unified } = req.body;

    if (!channelId) {
      return res.status(404).json({ error: "Channel ID is missing" });
    }

    if (!messageId) {
      return res.status(404).json({ error: "Message ID is missing" });
    }

    if (!emoji || !name || !unified) {
      return res.status(400).json({ error: "Emoji is empty" });
    }

    const channel = await db.channel.findUnique({
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
      return res.status(404).json({ error: "Channel not found" });
    }

    const member = channel.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let reaction = await db.reaction.findFirst({
      where: {
        channelId: +channelId,
        messageId: +messageId,
        unified: unified,
        memberId: member.id,
      },
    });

    if (reaction) {
      // remove reaction on message
      reaction = await db.reaction.delete({
        where: {
          id: reaction.id,
          channelId: +channelId,
          messageId: +messageId,
          memberId: member.id,
        },
      });
    } else {
      reaction = await db.reaction.create({
        data: {
          emoji,
          unified,
          name,
          messageId: +messageId,
          channelId: +channelId,
          memberId: member.id,
        },
      });
    }

    const updatedMessage = await db.message.findFirst({
      where: {
        channelId: +channelId,
        id: +messageId,
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

    if (updatedMessage) {
      const updateKey = `channel:${channelId}:messages:update`;
      res?.socket?.server?.io?.emit(updateKey, updatedMessage);
    }

    return res.status(200).json(reaction);
  } catch (error) {
    console.log("[MESSAGE_REACTION]", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
