"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { Loader2 } from "lucide-react";
import qs from "query-string";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export function DeleteMessageModal() {
  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "DELETE_MESSAGE_MODAL";
  const { socketUrl, socketQuery } = modal.data;

  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const url = qs.stringifyUrl({
        url: socketUrl || "",
        query: socketQuery,
      });

      await axios.delete(url);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    modal.onModalClose();
  };

  if (!isModalOpen) return null;
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="font-medium flex items-center gap-x-2">
            Delete Message
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this message?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-zinc-100 px-4 py-2">
          <DialogClose asChild>
            <Button type="button" variant="ghost" size="sm" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            className="gap-x-2"
            disabled={loading}
            size="sm"
            onClick={onDelete}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin transition" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
