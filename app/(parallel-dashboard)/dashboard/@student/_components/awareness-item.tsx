"use client";

import { useModal } from "@/hooks/use-modal-store";
import { getYoutubeThumbnail } from "@/lib/helper-methods";
import Image from "next/image";

interface Props {
  url: string;
  title: string;
}

const AwarenessItem = ({ url, title }: Props) => {
  const { onModalOpen } = useModal();
  const payload = {
    data: {
      contentType: "Video",
      url,
      name: title,
    },
    name: title,
  };
  return (
    <button
      className="rounded-md overflow-hidden cursor-pointer"
      onClick={() => onModalOpen("EXAM_FILE_VIEWER", { ...payload })}
    >
      <Image
        width={190}
        height={160}
        src={getYoutubeThumbnail(url, "hqdefault")}
        alt={"SelfAwareness"}
        priority
      />
    </button>
  );
};

export default AwarenessItem;
