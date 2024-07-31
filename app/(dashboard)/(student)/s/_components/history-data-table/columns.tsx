"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/helper-methods";
import { format } from "date-fns";
import { TableRowType } from "./schema";

export const columns: ColumnDef<TableRowType>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div className="text-sm md:text-base font-semibold">
        {format(new Date(row.getValue("created_at")), "MM-dd-yyyy")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "program_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate capitalize text-sm md:text-base font-semibold">
            {row.getValue("program_name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "granted_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Award" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate text-sm md:text-base font-semibold">
            {formatPrice(row.getValue("granted_amount"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "remaining_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaining Award" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate text-sm md:text-base font-semibold">
            {formatPrice(row.getValue("remaining_amount"))}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate text-sm md:text-base font-semibold">
            {row.getValue("isActive") ? (
              <Badge
                variant="secondary"
                className="bg-[var(--brand-color)] text-white"
              >
                Active
              </Badge>
            ) : (
              <Badge variant="outline">Inactive</Badge>
            )}
          </span>
        </div>
      );
    },
  },
];
