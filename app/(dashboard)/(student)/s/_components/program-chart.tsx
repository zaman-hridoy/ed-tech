"use client";

import { Separator } from "@/components/ui/separator";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Doughnut } from "react-chartjs-2";
import { BiSolidDoughnutChart } from "react-icons/bi";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgramChart = () => {
  const { data, status } = useSession();
  const dashboardData = useQuery({
    queryKey: [`grant-amount`],
    queryFn: () =>
      axios
        .get(`/auth/users/student-dashboard/${data?.user?.email}`)
        .then((res) => {
          if (res.data?.success) {
            return res.data;
          }
          return null;
        }),
    enabled: !!data,
    refetchOnWindowFocus: false,
  });

  const grantData = dashboardData.data || null;

  if (dashboardData.status === "pending") {
    return (
      <div className="bg-white rounded-md p-4 w-[400px] min-h-[450px] shrink-0 flex flex-col">
        <h4 className="text-sm text-slate-500 font-semibold">Award details</h4>
        <Separator className="my-2" />

        <div className="flex-1 flex flex-col items-center justify-center h-full space-y-2 select-none">
          <Loader2 className="w-14 h-14 animate-spin text-slate-300" />
        </div>
      </div>
    );
  }

  if (dashboardData.status === "error") {
    return (
      <div className="bg-white rounded-md p-4 w-[400px] min-h-[450px] shrink-0 flex flex-col">
        <h4 className="text-sm text-slate-500 font-semibold">Award details</h4>
        <Separator className="my-2" />

        <div className="flex-1 flex flex-col items-center justify-center h-full space-y-2 select-none">
          <BiSolidDoughnutChart className="w-14 h-14 text-slate-200" />
          <p className="text-sm text-slate-400 tracking-tight font-medium">
            No grants found.
          </p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: ["Amount Consumed", "Amount Remaining"],
    datasets: [
      {
        data: [
          +grantData?.grandSummary?.totalSpent,
          +grantData?.grandSummary?.totalRemaining,
        ],
        backgroundColor: ["#1bbef1", "#1ad391"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="bg-white rounded-md p-4 w-full lg:w-[400px] min-h-[450px] shrink-0 flex flex-col">
      <h4 className="text-sm text-slate-500 font-semibold">Award details</h4>
      <Separator className="my-2" />

      <div className="flex-1 flex flex-col items-center justify-center h-full space-y-2 select-none">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default ProgramChart;
