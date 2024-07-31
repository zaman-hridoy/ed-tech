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

    if (!query) {
      return NextResponse.json([]);
    }

    const users = await db.profile.findMany({
      where: {
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

        NOT: {
          id: profile.id,
        },
        // sentFriendRequests: {
        //   some: {
        //     NOT: {
        //       senderId: profile.id,
        //     },
        //   },
        // },
        // receivedFriendRequests: {
        //   some: {
        //     NOT: {
        //       receiverId: profile.id,
        //     },
        //   },
        // },
      },
      orderBy: {
        name: "asc",
      },
      take: +take,
      include: {
        receivedFriendRequests: {
          select: {
            id: true,
            senderId: true,
            status: true,
            sender: true,
          },
        },
      },
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
