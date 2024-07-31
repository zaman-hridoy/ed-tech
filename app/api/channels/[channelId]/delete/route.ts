import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";

// delete channel
export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
    }
    if (!params.channelId) {
      return NextResponse.json(
        { message: "Missing channel ID" },
        { status: 400 }
      );
    }

    const channel = await db.channel.delete({
      where: {
        id: +params.channelId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(channel);
  } catch (error) {
    console.log("[CHANNEL_LEAVE]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
