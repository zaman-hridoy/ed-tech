import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { channelId, userProfileId } = await req.json();
    if (!channelId) {
      return NextResponse.json(
        { message: "Missing channel ID" },
        { status: 400 }
      );
    }

    if (!userProfileId) {
      return NextResponse.json(
        { message: "Missing user profile ID" },
        { status: 400 }
      );
    }

    const existingChannel = await db.channel.findUnique({
      where: {
        id: +channelId,
      },
    });

    if (!existingChannel) {
      return NextResponse.json(
        { message: "Channel not found with the given ID" },
        { status: 404 }
      );
    }

    const channel = await db.channel.update({
      where: {
        id: channelId,
      },
      data: {
        members: {
          create: {
            profileId: userProfileId,
          },
        },
      },
      include: {
        profile: true,
        members: {
          include: {
            profile: true,
          },
        },
      },
    });

    return NextResponse.json(channel);
  } catch (error) {
    console.log("CHANNEL_JOIN", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
