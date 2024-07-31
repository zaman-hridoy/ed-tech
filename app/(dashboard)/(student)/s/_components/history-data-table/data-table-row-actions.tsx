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
import axios from "@/lib/instance";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { TableRowType } from "./schema";

interface Props {
  row: TableRowType;
}

export function DataTableRowActions({ row }: Props) {
  const router = useRouter();
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteRow = async (row: TableRowType) => {
    try {
      setLoading(true);
      await axios.delete(`/operations/OpsCostcenter/${row.id}/`, {
        headers: {
          Authorization: "Bearer " + data?.user?.accessToken,
        },
      });

      toast.success("Data deleted successfully.");
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
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
        <DropdownMenuItem className="cursor-pointer flex items-center gap-x-2">
          <Edit className="w-4 h-4" />
          Edit
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
