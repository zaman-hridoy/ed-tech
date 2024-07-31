"use client";

import FormTitle from "@/app/(info-and-course)/_components/form-title";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { FaAddressBook } from "react-icons/fa6";
import CartItem from "../../../_components/orders-data-table/cart-item";

interface Props {
  params: {
    orderId: string;
  };
}

const OrderItemPage = ({ params }: Props) => {
  const { data, status } = useSession();
  const state = useQuery({
    queryKey: [`get-order-detail_${params.orderId}`],
    queryFn: () =>
      axios
        .post(
          `/auth/users/get-order-detail`,
          { order_id: params.orderId },
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
    enabled: status === "authenticated",
  });

  if (state.status === "pending") {
    return (
      <div className="space-y-6">
        <FormTitle title="Order Details" />

        <div className="flex-1 flex flex-col items-center justify-center h-full space-y-2 select-none">
          <Loader2 className="w-14 h-14 animate-spin text-slate-300" />
        </div>
      </div>
    );
  }

  const cartData = state.data?.cartData;

  return (
    <div className="space-y-6">
      <FormTitle title="Order Details" />

      <div className="flex items-center bg-white rounded-md p-4">
        <div className="flex flex-col text-left">
          <h4 className="text-base md:text-xl font-semibold tracking-tight text-slate-800">
            Order{" "}
            <span className="text-[var(--brand-color)]">#{params.orderId}</span>
          </h4>
          {cartData?.created_at && (
            <p className="text-sm text-slate-500">
              Placed on
              {format(new Date(cartData?.created_at), "dd MMM yyyy hh:mm")}
            </p>
          )}
        </div>

        <p className="text-base md:text-xl text-slate-800 font-semibold ml-auto">
          Price: $45.99
        </p>
      </div>

      <div className="bg-white rounded-md p-4 min-h-[450px] shrink-0 flex flex-col">
        <h4 className="text-sm text-slate-500 font-semibold">Items(2)</h4>
        <Separator className="my-2" />

        {state.status === "success" && (
          <div className="flex-1 flex flex-col space-y-4 pt-4 select-none">
            {state.data.map((item: any, idx: number) => (
              <CartItem
                key={item.id}
                cart={item}
                isLastItem={state.data.length === idx + 1}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-md p-4 min-h-[450px] shrink-0 flex flex-col">
          <h4 className="text-sm text-slate-500 font-semibold">
            Pick-up point
          </h4>
          <Separator className="my-2" />

          <div className="flex-1 flex flex-col items-center justify-center h-full space-y-2 select-none">
            <FaAddressBook className="w-14 h-14 text-slate-200" />
            <p className="text-sm text-slate-400 tracking-tight font-medium">
              No address found.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-md p-4 h-max">
          <h4 className="text-sm text-slate-500 font-semibold">
            Total Summary
          </h4>
          <Separator className="my-2" />

          <div className="flex items-center justify-between text-base font-medium mb-1">
            <p>Subtotal:</p>
            <span>{formatPrice(89.99)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-medium">
            <p>Shipping & handling:</p>
            <span>--</span>
          </div>

          <Separator className="my-4" />
          <div className="flex items-center justify-between text-base font-medium mb-1">
            <p>Total before tax:</p>
            <span>{formatPrice(789.0)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-medium">
            <p>Estimated tax to be collected:</p>
            <span>--</span>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between text-xl font-medium">
            <h3>Order total:</h3>
            <span>--</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemPage;
