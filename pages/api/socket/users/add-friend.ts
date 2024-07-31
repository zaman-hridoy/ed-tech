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

    const { receiverId } = req.body;
    if (!receiverId) {
      return res.status(401).json({ message: "Receiver ID missing" });
    }

    const received_request = await db.friendRequest.findFirst({
      where: {
        senderId: profile.id,
        receiverId: +receiverId,
      },
    });

    console.log(received_request);

    if (received_request?.status === "PENDING") {
      return res.status(400).json({ error: "User already sent you a request" });
    }

    if (received_request?.status === "ACCEPTED") {
      return res
        .status(400)
        .json({ error: "User already in your friend list" });
    }

    const sent_request = await db.friendRequest.create({
      data: {
        senderId: profile.id,
        receiverId: +receiverId,
      },
      include: {
        sender: true,
      },
    });

    // create notification
    const notification = await db.notification.create({
      data: {
        profileId: +receiverId,
        frientRequestId: sent_request.id,
      },
      include: {
        message: true,
        directMessage: true,
        friendRequest: {
          include: {
            sender: true,
            receiver: true,
          },
        },
      },
    });

    const notificationKey = `notification:user:${receiverId}:add`;

    res?.socket?.server?.io?.emit(notificationKey, notification);

    return res.status(200).json(sent_request);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
