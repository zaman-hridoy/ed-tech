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

    const { receiverId, requestId } = req.body;
    if (!receiverId) {
      return res.status(401).json({ message: "Receiver ID missing" });
    }

    if (!requestId) {
      return res.status(401).json({ message: "Request ID missing" });
    }

    const received_request = await db.friendRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (received_request?.status === "ACCEPTED") {
      return res
        .status(400)
        .json({ error: "User already in your friend list" });
    }

    if (received_request?.status !== "PENDING") {
      return res
        .status(400)
        .json({ error: "You didn't send a friend request." });
    }

    const sent_request = await db.friendRequest.delete({
      where: {
        id: +requestId,
      },
      include: {
        sender: true,
      },
    });

    // create notification
    const notification = await db.notification.deleteMany({
      where: {
        profileId: +receiverId,
        frientRequestId: requestId,
      },
    });

    const notificationKey = `notification:user:${sent_request.receiverId}:delete`;
    console.log({ notificationKey });
    res?.socket?.server?.io?.emit(notificationKey, notification);

    return res.status(200).json(sent_request);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
