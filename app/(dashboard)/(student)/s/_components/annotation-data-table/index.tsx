"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import FormTitle from "./form-title";

const AnnotationDataTable = () => {
  const state = useQuery({
    queryKey: [`annotations-list`],
    queryFn: () => axios.get(`/api/annotations/list`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  if (state.status === "pending") {
    return (
      <div className="bg-white rounded-md border-slate-100 p-4 relative">
        <FormTitle title="Annotated Contents" />
        <div className="flex-1 flex flex-col items-center h-96 justify-center space-y-2 select-none">
          <Loader2 className="w-14 h-14 animate-spin text-slate-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md border-slate-100 p-4 relative">
      <FormTitle title="Annotated Contents" />
      <DataTable data={state.data || []} columns={columns} />
    </div>
  );
};

export default AnnotationDataTable;
