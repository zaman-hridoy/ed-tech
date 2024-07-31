"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LuBookCopy } from "react-icons/lu";
import CartItem from "./cart-item";

interface Props {
  orderData: any;
  isOpen: boolean;
}

const SingleOrderItem = ({ orderData, isOpen }: Props) => {
  const { data, status } = useSession();
  const state = useQuery({
    queryKey: [`get-order-detail_${orderData.order_id}`],
    queryFn: () =>
      axios
        .post(
          `/auth/users/get-order-detail`,
          { order_id: orderData.order_id },
          {
            headers: {
              Authorization: data?.user.accessToken,
            },
          }
        )
        .then((res) => {
          return res.data?.cartData;
        }),
    refetchOnWindowFocus: false,
    enabled: status === "authenticated" && isOpen,
  });

  return (
    <AccordionItem
      value={orderData.order_id}
      className="p-4 bg-white rounded-md"
    >
      {/* <AccordionTrigger> */}
      <div className="flex items-center">
        <div className="flex flex-col text-left pb-2">
          <h4 className="text-base font-medium tracking-tight text-slate-800">
            Order{" "}
            <span className="text-[var(--brand-color)]">
              #{orderData.order_id}
            </span>
          </h4>
          <p className="text-sm text-slate-500">
            Placed on
            {format(new Date(orderData?.created_at), "dd MMM yyyy hh:mm")}
          </p>
        </div>

        <Link
          href={`/s/dashboard/orders/${orderData.order_id}`}
          className="px-4 py-2 rounded-md text-sm text-white bg-[var(--brand-color)] ml-auto"
        >
          Manage
        </Link>
        <AccordionTrigger className="ml-6">
          <Button size="icon" className="sr-only">
            Open
          </Button>
        </AccordionTrigger>
      </div>

      {/* </AccordionTrigger> */}
      {isOpen && (
        <AccordionContent>
          {state.status === "pending" && (
            <div className="flex-1 flex flex-col items-center h-20 justify-center space-y-2 select-none">
              <Loader2 className="w-14 h-14 animate-spin text-slate-300" />
            </div>
          )}

          {state.status === "error" && (
            <div className="flex-1 flex flex-col items-center justify-center h-full space-y-2 select-none">
              <LuBookCopy className="w-14 h-14 text-slate-200" />
              <p className="text-sm text-slate-400 tracking-tight font-medium">
                No item found.
              </p>
            </div>
          )}

          {state.status === "success" && (
            <div className="flex-1 flex flex-col border-t space-y-4 pt-4 select-none">
              {state.data.map((item: any, idx: number) => (
                <CartItem
                  key={item.id}
                  cart={item}
                  isLastItem={state.data.length === idx + 1}
                />
              ))}
            </div>
          )}
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

export default SingleOrderItem;
