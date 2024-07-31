"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CartItem from "./_components/cart-item";

const CartPage = () => {
  const session = useSession();

  const cartState = useQuery({
    queryKey: ["show-cart-list"],
    queryFn: () =>
      axios.post("/auth/users/get-cart-data", {
        user_id: session.data?.user?.userId,
      }),
    enabled: !!session.data,
  });

  if (cartState.status === "error") {
    return (
      <div>
        <h1>Error to show cart list</h1>
      </div>
    );
  }

  if (cartState.status === "pending") {
    return (
      <div className="pt-14 md:pt-16 lg:pt-20 pb-10">
        <Container>
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin w-20 h-10" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-14 md:pt-16 lg:pt-20 pb-10">
      <Container>
        <div className="flex items-start gap-8">
          <div className="bg-white flex-1 shadow-sm rounded-md p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl md:text-2xl font-medium mb-2">
                Shopping Cart
              </h1>
              <p className="text-base font-medium">Price</p>
            </div>
            <Separator />

            {/* cart item list */}
            <div className="space-y-6 py-4">
              {cartState.data &&
                cartState.data.data &&
                cartState.data.data.cart.map((cart: any) => (
                  <CartItem key={cart.id} cart={cart} />
                ))}
            </div>

            <div className="text-right">
              <p className="text-base font-medium">
                Subtotal ({cartState.data?.data?.cart?.length} items):{" "}
                <strong>
                  {" "}
                  {formatPrice(+cartState?.data?.data?.total.totalPrices)}
                </strong>
              </p>
            </div>
          </div>
          <div className="bg-white w-full md:w-96 shadow-sm rounded-md p-4">
            <div className="text-left">
              <p className="text-xl font-medium">
                Subtotal ({cartState.data?.data?.cart?.length} items):{" "}
                <strong>
                  {formatPrice(+cartState?.data?.data?.total.totalPrices)}
                </strong>
              </p>
            </div>
            <Link href="/book-checkout">
              <Button
                variant="primary"
                className="w-full hover:scale-105 transition-all mt-4"
                size="sm"
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
