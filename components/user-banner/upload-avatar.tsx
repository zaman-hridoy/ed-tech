import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Edit3 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { UploadImageModal } from "./upload-image-modal";

interface Props {
  src?: string;
  className?: string;
  fallbackName?: string;
}

const UploadAvatar = ({
  src,
  className,
  fallbackName = "Profile Photo",
}: Props) => {
  return (
    <>
      <div className="relative rounded-full w-fit">
        <UploadImageModal>
          <Button
            size="icon"
            className="bg-[var(--brand-color-secondary)] absolute right-2 w-auto h-auto z-10 p-1 rounded-sm hover:bg-[var(--brand-color-secondary)] border-2"
          >
            <Edit3 className="w-3 h-3" />
          </Button>
        </UploadImageModal>

        <Avatar
          className={cn(
            "h-7 w-7 border-4 border-white pointer-events-none relative",
            className
          )}
        >
          <AvatarImage src={src} />
          <AvatarFallback>
            <div className="relative w-full h-full">
              <Image
                fill
                src="/placeholder.jpg"
                alt={fallbackName}
                className="object-cover"
                sizes="100%"
                priority
              />
            </div>
          </AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

export default UploadAvatar;
