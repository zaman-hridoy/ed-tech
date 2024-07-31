import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";

import * as z from "zod";

const bodySchema = z.object({
  title: z.string().min(1),
  note: z.string().min(1),
});

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: {
      annotationId: string;
      noteId: string;
    };
  }
) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!params.annotationId) {
      return NextResponse.json({
        error: "Annotation ID is missing",
      });
    }

    if (!params.noteId) {
      return NextResponse.json({
        error: "Note ID is missing",
      });
    }

    const body = await req.json();
    const values = bodySchema.safeParse(body);
    if (!values.success) {
      return NextResponse.json(values, { status: 400 });
    }

    const { title, note } = values.data;

    const annotation = await db.annotation.findUnique({
      where: {
        id: +params.annotationId,
      },
    });

    if (!annotation) {
      return NextResponse.json({
        error: "Annotation not found wit the given id",
      });
    }

    const annotationNote = await db.annotationNote.update({
      where: {
        id: +params.noteId,
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

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      annotationId: string;
      noteId: string;
    };
  }
) {
  try {
    const profile = await getChatProfile();
    if (!profile) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!params.annotationId) {
      return NextResponse.json(
        { message: "Annotation ID is missing" },
        { status: 400 }
      );
    }

    if (!params.noteId) {
      return NextResponse.json(
        { message: "Note ID is missing" },
        { status: 400 }
      );
    }

    const annotation = await db.annotation.findUnique({
      where: {
        id: +params.annotationId,
      },
    });
    if (!annotation) {
      return NextResponse.json({
        error: "Annotation not found with the given id",
      });
    }

    const note = await db.annotationNote.delete({
      where: {
        id: +params.noteId,
        profileId: profile.id,
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("ANNOTATION_NOTE_DELETE", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
