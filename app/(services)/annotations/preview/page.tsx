import { ModalTemplate } from "@/components/modal-template";
import { db } from "@/lib/db";
import EditorWrapper from "../_components/editor-wrapper";

interface Props {
  searchParams: {
    annotationId: number;
  };
}

const AnnotationEditorPage = async ({ searchParams }: Props) => {
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
      <EditorWrapper annotation={annotation} mode="preview" />
    </div>
  );
};

export default AnnotationEditorPage;
