import { ModalTemplate } from "@/components/modal-template";
import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { redirect } from "next/navigation";
import EditorWrapper from "../_components/editor-wrapper";

interface Props {
  searchParams: {
    url: string;
    type: "DRIVE" | "MY_DRIVE" | "YOUTUBE" | "EXTERNAL_URL";
    annotationId: number;
  };
}

const AnnotationEditorPage = async ({ searchParams }: Props) => {
  const profile = await getChatProfile();

  if (!profile) return redirect("/");

  if (!searchParams.annotationId) {
    return (
      <ModalTemplate
        title="Not found"
        description="There is no annotation with the given ID or may deleted."
      ></ModalTemplate>
    );
  }

  const annotation = await db.annotation.findUnique({
    where: {
      id: +searchParams.annotationId,
    },
    include: {
      profile: true,
    },
  });

  if (!annotation) {
    return (
      <ModalTemplate
        title="Not found"
        description="There is no annotation"
      ></ModalTemplate>
    );
  }

  return (
    <div className="h-full flex flex-col lg:pr-[450px]">
      <EditorWrapper annotation={annotation} mode="edit" />
    </div>
  );
};

export default AnnotationEditorPage;
