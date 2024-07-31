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

    const { id } = req.body;
    if (!id) {
      return res.status(401).json({ message: "Notification ID missing" });
    }

    // create notification
    const notification = await db.notification.delete({
      where: {
        id,
      },
    });

    // const notificationKey = `notification:user:${receiverId}:delete`;
    // res?.socket?.server?.io?.emit(notificationKey, notification);

    return res.status(200).json(notification);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
