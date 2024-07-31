"use client";

import { Button } from "@/components/ui/button";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ActionTooltip from "../action-tooltip";

const Cart = () => {
  const { data } = useSession();
  const state = useQuery({
    queryKey: ["cart-items"],
    queryFn: () =>
      axios
        .post("/auth/users/get-cart-data", { user_id: data?.user?.userId })
        .then((res) => res.data),
    enabled: !!data,
  });

  const cartItems: any[] = state.data?.cart || [];
  return (
    <ActionTooltip label="Cart">
      <Link href="/cart">
        <Button
          className="text-[#EDF67D] w-[30px] h-[30px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50 relative"
          size="icon"
          variant="ghost"
        >
          <ShoppingCartIcon className="w-6 h-6" />
          {cartItems.length > 0 && (
            <div className="absolute -top-3 right-0 rounded-full">
              <div className="text-white">{cartItems.length}</div>
            </div>
          )}
        </Button>
      </Link>
    </ActionTooltip>
  );
};

export default Cart;
