import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";
import * as z from "zod";

const bodySchema = z.object({
  title: z.string().min(1),
  note: z.string().min(1),
  played: z.number(), // in seconds
  duration: z.number(), // in seconds
  annotationId: z.number(),
});

export async function GET(req: Request, res: Response) {
  try {
    const url = new URL(req.url);
    const annotationId = url.searchParams.get("annotationId");
    if (!annotationId) {
      return NextResponse.json({
        error: "AnnotationId is missing",
      });
    }

    const annotation = await db.annotation.findUnique({
      where: {
        id: +annotationId,
      },
    });
    if (!annotation) {
      return NextResponse.json({
        error: "Annotation not found with the given id",
      });
    }

    const notes = await db.annotationNote.findMany({
      where: {
        annotationId: +annotationId,
      },
      include: {
        profile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.log("ANNOTATION_GET", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, res: Response) {
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

    const { title, note, played, duration, annotationId } = values.data;

    const annotation = await db.annotation.findUnique({
      where: {
        id: annotationId,
      },
    });

    if (!annotation) {
      return NextResponse.json({
        error: "Annotation not found wit the given id",
      });
    }

    const annotationNote = await db.annotationNote.create({
      data: {
        profileId: profile.id,
        annotationId,
        title,
        note,
        duration,
        played,
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
