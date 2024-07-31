import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const profile = await getChatProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // validate body with joi
    return NextResponse.json({ success: true, body });
  } catch (error) {
    console.log(`[BOOK_POST]`, error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
