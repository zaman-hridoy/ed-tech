import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";

// get channel by id
export async function GET(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!params.channelId) {
      return NextResponse.json(
        { message: "Channel ID is missing" },
        { status: 400 }
      );
    }

    const channel = await db.channel.findUnique({
      where: {
        id: +params.channelId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
        profile: true,
      },
    });

    return NextResponse.json(channel);
  } catch (error) {
    console.log("[CHANNEL_ID_GET]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// update channel
export async function PUT(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!params.channelId) {
      return NextResponse.json(
        { message: "Channel ID is missing" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const channel = await db.channel.update({
      where: {
        id: Number(params.channelId),
        // profileId: profile.id, // only creator can update channel
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        ...body,
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
        profile: true,
      },
    });

    return NextResponse.json(channel);
  } catch (error) {
    console.log("[CHANNEL_ID]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
