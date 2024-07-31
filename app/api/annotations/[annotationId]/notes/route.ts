import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";
import * as z from "zod";

const bodySchema = z.object({
  title: z.string().min(1),
  note: z.string().min(1),
  noteId: z.number(),
});

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: {
      annotationId: string;
    };
  }
) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const values = bodySchema.safeParse(body);
    if (!values.success) {
      return NextResponse.json(values, { status: 400 });
    }

    const { title, note, noteId } = values.data;

    const annotation = await db.annotationNote.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!annotation) {
      return NextResponse.json({
        error: "Annotation not found wit the given id",
      });
    }

    const annotationNote = await db.annotationNote.update({
      where: {
        id: noteId,
        profileId: profile.id,
      },
      data: {
        title,
        note,
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(annotationNote);
  } catch (error) {
    console.log("ANNOTATION_POST", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
