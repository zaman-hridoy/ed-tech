"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FormTitle from "./form-title";

const HistoryDataTable = () => {
  const { data, status } = useSession();
  const dashboardData = useQuery({
    queryKey: [`grant-amount-history`],
    queryFn: () =>
      axios
        .get(`/auth/users/student-dashboard/${data?.user?.email}`)
        .then((res) => {
          if (res.data?.success) {
            return res.data;
          }
          return null;
        }),
    enabled: status === "authenticated",
  });

  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const result = dashboardData.data || null;
    console.log({ result });
    if (result) {
      let d: any[] = [];
      if (result?.programSummaries && result?.programSummaries?.length > 0) {
        const active_data = result?.programSummaries?.map((item: any) => ({
          ...item,
          isActive: true,
        }));
        d.push(...active_data);
      }
      if (result?.inActivePrograms && result?.inActivePrograms?.length > 0) {
        const inactive_data = result?.inActivePrograms?.map((item: any) => ({
          ...item,
          isActive: false,
        }));
        d.push(...inactive_data);
      }

      console.log({ d });
      setTableData(d);
    }
  }, [dashboardData.data]);

  if (dashboardData.status === "pending") {
    return (
      <div className="bg-white rounded-md border-slate-100 p-4 relative">
        <FormTitle title="Grant History" />
        <div className="flex-1 flex flex-col items-center h-96 justify-center space-y-2 select-none">
          <Loader2 className="w-14 h-14 animate-spin text-slate-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md border-slate-100 p-4 relative">
      <FormTitle title="Grant History" />
      <DataTable data={tableData} columns={columns} />
    </div>
  );
};

export default HistoryDataTable;
