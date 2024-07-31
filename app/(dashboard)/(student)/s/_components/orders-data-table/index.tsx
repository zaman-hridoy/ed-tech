"use client";

import { Accordion } from "@/components/ui/accordion";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import FormTitle from "./form-title";
import SingleOrderItem from "./single-order-item";

const OrdersDataTable = () => {
  const { data, status } = useSession();
  const state = useQuery({
    queryKey: [`user-order-list`],
    queryFn: () =>
      axios
        .post(
          `/auth/users/user-order-list`,
          { userId: data?.user?.userId },
          {
            headers: {
              Authorization: data?.user.accessToken,
            },
          }
        )
        .then((res) => {
          if (res.data?.status) {
            return res.data?.data;
          }
          return [];
        }),
    refetchOnWindowFocus: false,
    enabled: status === "authenticated",
  });

  const [selectedTabs, setSelectedTab] = useState<string[]>([]);

  if (state.status === "pending") {
    return (
      <div className="bg-white rounded-md border-slate-100 p-4 relative">
        <FormTitle title="My Orders" />
        <div className="flex-1 flex flex-col items-center h-96 justify-center space-y-2 select-none">
          <Loader2 className="w-14 h-14 animate-spin text-slate-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <FormTitle title="My Orders" />
      {/* <DataTable data={state.data || []} columns={columns} /> */}
      <Accordion
        type="multiple"
        className="w-full space-y-4"
        onValueChange={(value) => setSelectedTab(value)}
      >
        {state.data?.map((item: any) => (
          <SingleOrderItem
            key={item.id}
            orderData={item}
            isOpen={selectedTabs.includes(item.order_id)}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default OrdersDataTable;
