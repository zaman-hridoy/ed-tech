import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();

export async function PATCH(
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

    const channel = await db.channel.update({
      where: {
        id: Number(params.channelId),
        // profileId: profile.id, // only creator can invite others
        members: {
          some: {
            profileId: profile.id, // channel member can invite others
          },
        },
      },
      data: {
        inviteCode: uid.stamp(15),
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
