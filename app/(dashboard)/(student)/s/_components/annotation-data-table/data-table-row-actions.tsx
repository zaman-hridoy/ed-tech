"use client";

import { ConfirmAlertModal } from "@/components/confirm-alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Edit, MoreHorizontal, PlayCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Annotation } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  row: Annotation;
}

export function DataTableRowActions({ row }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDeleteRow = async (row: Annotation) => {
    try {
      setLoading(true);
      await axios.delete(`/api/annotations/${row.id}`);
      toast.success("Successfully deleted.");
      setOpen(false);
      queryClient.refetchQueries({ queryKey: ["annotations-list"] });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild onClick={() => setOpen(true)}>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-x-2"
          onClick={() =>
            router.push(`/annotations/editor?annotationId=${row.id}`)
          }
        >
          <Edit className="w-4 h-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-x-2"
          onClick={() =>
            router.push(`/annotations/preview?annotationId=${row.id}`)
          }
        >
          <PlayCircle className="w-4 h-4" />
          Preview
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <ConfirmAlertModal
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your data from our servers."
          onContinue={() => handleDeleteRow(row)}
          loading={loading}
        >
          <DropdownMenuItem className="cursor-pointer flex items-center gap-x-2 text-red-500">
            <Trash2 className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </ConfirmAlertModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
