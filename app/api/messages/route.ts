import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await getChatProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!channelId) {
      return NextResponse.json(
        { message: "Channel ID missing" },
        { status: 401 }
      );
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: +cursor,
        },
        where: {
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
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
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
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;
    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log("[MESSEAGES_GET]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
