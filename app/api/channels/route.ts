import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { ChannelType, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const channelSchema = z.object({
  name: z
    .string({ required_error: "Please enter channel name." })
    .trim()
    .min(3),
  description: z.string().optional().default(""),
  isPublic: z.boolean().default(false),
  type: z.nativeEnum(ChannelType).default("TEXT"),
});

export async function POST(req: Request, res: Response) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const body = await req.json();
    const values = channelSchema.safeParse(body);

    if (!values.success) {
      return NextResponse.json(values, { status: 400 });
    }
    const { name, description, isPublic, type } = values.data;
    const channel = await db.channel.create({
      data: {
        profileId: profile.id,
        name,
        description,
        isPublic,
        type,
        members: {
          create: {
            profileId: profile.id,
            role: MemberRole.ADMIN,
          },
        },
        permissions: {
          create: {},
        },
      },
    });

    return NextResponse.json(channel);
  } catch (error) {
    console.log("CHANNEL_POST", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
