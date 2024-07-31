import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { inviteCode } = await req.json();
    if (!inviteCode) {
      return NextResponse.json(
        { message: "Missing invite code" },
        { status: 400 }
      );
    }

    const existingChannel = await db.channel.findFirst({
      where: {
        inviteCode: inviteCode,
      },
    });

    if (!existingChannel) {
      return NextResponse.json(
        { message: "Invalid invite code" },
        { status: 400 }
      );
    }

    const channel = await db.channel.update({
      where: {
        inviteCode: inviteCode,
      },
      data: {
        members: {
          create: {
            profileId: profile.id,
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
