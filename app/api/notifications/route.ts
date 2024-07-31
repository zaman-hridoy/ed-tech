import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { Notification } from "@prisma/client";
import { NextResponse } from "next/server";

const NOTIFICATION_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await getChatProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");

    if (!profile) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let notifications: Notification[] = [];

    if (cursor) {
      notifications = await db.notification.findMany({
        take: NOTIFICATION_BATCH,
        skip: 1,
        cursor: {
          id: +cursor,
        },
        where: {
          profileId: profile.id,
        },
        include: {
          profile: true,
          message: true,
          directMessage: true,
          friendRequest: {
            include: {
              sender: true,
              receiver: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } else {
      notifications = await db.notification.findMany({
        take: NOTIFICATION_BATCH,
        where: {
          profileId: profile.id,
        },
        include: {
          profile: true,
          message: true,
          directMessage: true,
          friendRequest: {
            include: {
              sender: true,
              receiver: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }

    let nextCursor = null;
    if (notifications.length === NOTIFICATION_BATCH) {
      nextCursor = notifications[NOTIFICATION_BATCH - 1].id;
    }

    return NextResponse.json({
      items: notifications,
      nextCursor,
    });
  } catch (error) {
    console.log("[NOTIFICATION_GET]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
