"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { PieChart } from "lucide-react";
import { useSession } from "next-auth/react";
import { FaChartSimple, FaHandHoldingDollar } from "react-icons/fa6";

const GrantCards = () => {
  const { data, status } = useSession();
  const dashboardData = useQuery({
    queryKey: [`grant-amount-cards`],
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

  const grantData = dashboardData.data || null;

  if (dashboardData.status === "pending") {
    return (
      <div className="space-y-4">
        <div className="px-4 py-3 bg-[var(--brand-color)] rounded-md text-white text-base tracking-tight">
          <h4>Dashboard for Grant programs: Current Semester</h4>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="w-full h-[130px] bg-slate-300 border-2" />
          <Skeleton className="w-full h-[130px] bg-slate-300 border-2" />
          <Skeleton className="w-full h-[130px] bg-slate-300 border-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="px-4 py-3 bg-[var(--brand-color)] rounded-md text-white text-base tracking-tight">
        <h4>Dashboard for Grant programs: {grantData?.activeSemester?.name}</h4>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-white shadow-sm rounded-md drop-shadow-md p-4 border-2 border-[var(--brand-color-warning)] flex items-center gap-x-4">
          <div className="space-y-3">
            <p className="text-sm text-slate-500 font-medium tracking-tight">
              Award Granted This Semester
            </p>

            <h4 className="text-slate-900 text-3xl font-bold tracking-tight">
              {formatPrice(+grantData?.grandSummary?.totalGranted || 0)}
            </h4>
          </div>
          <FaChartSimple className="w-10 h-10 ml-auto text-[var(--brand-color-warning)]" />
        </div>

        <div className="bg-white shadow-sm rounded-md drop-shadow-md p-4 border-2 border-[var(--brand-color-secondary)] flex items-center gap-x-4">
          <div className="space-y-3">
            <p className="text-sm text-slate-500 font-medium tracking-tight">
              Award Amount Consumed
            </p>

            <h4 className="text-slate-900 text-3xl font-bold tracking-tight">
              {formatPrice(+grantData?.grandSummary?.totalSpent || 0)}
            </h4>
          </div>
          <PieChart className="w-10 h-10 ml-auto text-[var(--brand-color-secondary)]" />
        </div>

        <div className="bg-white shadow-sm rounded-md drop-shadow-md p-4 border-2 border-[var(--brand-color-success)] flex items-center gap-x-4">
          <div className="space-y-3">
            <p className="text-sm text-slate-500 font-medium tracking-tight">
              Remaining Award Amount
            </p>

            <h4 className="text-slate-900 text-3xl font-bold tracking-tight">
              {formatPrice(+grantData?.grandSummary?.totalRemaining || 0)}
            </h4>
          </div>
          <FaHandHoldingDollar className="w-10 h-10 ml-auto text-[var(--brand-color-success)]" />
        </div>
      </div>
    </div>
  );
};

export default GrantCards;
