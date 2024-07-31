import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { NextResponse } from "next/server";

export async function DELETE(
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
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!params.annotationId) {
      return NextResponse.json(
        { message: "Annotation ID is missing" },
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

    const note = await db.annotation.delete({
      where: {
        id: +params.annotationId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("ANNOTATION_DELETE", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
