"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function ModalTemplate({ title, description, children, footer }: Props) {
  const router = useRouter();
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px] bg-white p-0">
        {(title || description) && (
          <DialogHeader className="p-4">
            {title && (
              <DialogTitle className="font-medium flex items-center gap-x-2">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div>{children}</div>

        <DialogFooter className="bg-zinc-100 px-4 py-2">
          <div>
            <Button
              variant="secondary"
              onClick={() => router.back()}
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Go Back
            </Button>

            <Button variant="primary" onClick={() => router.push("/dashboard")}>
              Go To Home
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
