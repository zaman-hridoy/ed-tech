import { db } from "@/lib/db";
import { getPageChatProfile } from "@/lib/get-page-chat-profile";
import { NextApiResponseWithServerIO } from "@/lib/types";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithServerIO
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const profile = await getPageChatProfile(req, res);

    if (!profile) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { message } = req.body;
    const { channelId, messageId } = req.query;
    if (!channelId) {
      return res.status(401).json({ message: "Channel ID missing" });
    }
    if (!messageId) {
      return res.status(401).json({ message: "Message ID missing" });
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

    let updatedMessage = await db.message.findFirst({
      where: {
        id: +messageId,
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

    if (!updatedMessage || updatedMessage.isDeleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    const isMessageOwner = updatedMessage.member.profileId === profile.id;
    const isAdmin = memebr.role === MemberRole.ADMIN;
    const isModerator = memebr.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (req.method === "DELETE") {
      updatedMessage = await db.message.update({
        where: {
          id: +messageId,
        },
        data: {
          isDeleted: true,
          content: "This message has been deleted.",
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
    }

    if (req.method === "PATCH") {
      if (!message) {
        return res.status(401).json({ message: "Message is empty" });
      }
      if (!isMessageOwner) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      updatedMessage = await db.message.update({
        where: {
          id: +messageId,
        },
        data: {
          content: message,
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
    }

    const updateKey = `channel:${channelId}:messages:update`;
    res?.socket?.server?.io?.emit(updateKey, updatedMessage);

    return res.status(200).json(updatedMessage);
  } catch (error) {
    console.log("[MESSAGES_ID]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
