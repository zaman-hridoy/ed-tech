import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const url = new URL(req.url);
    const query = url.searchParams?.get("query") || "";
    const take = url.searchParams?.get("take") || 10;

    if (!query) {
      return NextResponse.json([]);
    }

    const channels = await db.channel.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        isPublic: true,
        NOT: {
          members: {
            some: {
              profileId: profile.id,
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      take: +take,
      select: {
        name: true,
        id: true,
        inviteCode: true,
        profile: true,
      },
    });

    return NextResponse.json(channels);
  } catch (error) {
    console.log("CHANNEL_POST", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
