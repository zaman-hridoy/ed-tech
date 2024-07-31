import { ModalTemplate } from "@/components/modal-template";
import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { getYoutubeVideoID } from "@/lib/helper-methods";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    url: string;
    type: "DRIVE" | "MY_DRIVE" | "YOUTUBE" | "EXTERNAL_URL";
  };
}

const AnnotationPage = async ({ searchParams }: Props) => {
  const profile = await getChatProfile();

  if (!profile) return redirect("/");

  if (!searchParams.url || !searchParams.type) {
    return (
      <ModalTemplate
        title="Not found"
        description="There is no video url or video type"
      ></ModalTemplate>
    );
  }

  const isYoutubeUrl = getYoutubeVideoID(searchParams.url);

  const annotation = await db.annotation.create({
    data: {
      videoUrl: searchParams.url,
      provider: isYoutubeUrl ? "YOUTUBE" : "FILE",
      profileId: profile.id,
    },
  });

  return redirect(`/annotations/editor?annotationId=${annotation.id}`);
};

export default AnnotationPage;
