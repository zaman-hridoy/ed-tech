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
    const query = url.searchParams.get("query") || "";
    const take = url.searchParams.get("take") || 10;
    const channelId = url.searchParams.get("channelId");

    if (!query || !channelId) {
      return NextResponse.json([]);
    }

    const users = await db.profile.findMany({
      where: {
        NOT: {
          members: {
            some: {
              channelId: +channelId,
            },
          },
        },
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        name: "asc",
      },
      take: +take,
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("USERS_SEARCH", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
