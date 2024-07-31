"use client";

import { formatPrice } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { BookAudioIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  cart: any;
  isLastItem?: boolean;
}

const CartItem = ({ cart, isLastItem }: Props) => {
  const queryClient = useQueryClient();

  const [isDecreasing, setIsDecreasing] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const onUpdateQuantity = (count: number, type: "decrease" | "increase") => {
    if (type === "decrease") {
      setIsDecreasing(true);
    }
    if (type === "increase") {
      setIsIncreasing(true);
    }
    axios
      .post("/auth/users/update-cart-data", {
        cart_id: cart?.id,
        quantity: count,
      })
      .then((res) => {
        queryClient.refetchQueries({ queryKey: ["show-cart-list"] });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        if (type === "decrease") {
          setIsDecreasing(false);
        }
        if (type === "increase") {
          setIsIncreasing(false);
        }
      });
  };

  const handleRemove = (cartId: number) => {
    setIsRemoving(true);
    axios
      .post("/auth/users/delete-cart-data", {
        cart_id: cartId,
      })
      .then((res) => {
        queryClient.refetchQueries({ queryKey: ["show-cart-list"] });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsRemoving(false);
      });
  };

  return (
    <div className={cn("flex gap-8 pb-6", !isLastItem && "border-b")}>
      {cart.book_data?.cover_image ? (
        <div className="w-20 aspect-[5/6] relative bg-slate-100 rounded-md overflow-hidden">
          <Image
            src={cart.book_data?.cover_image}
            alt={cart.book_data?.title}
            fill
            priority
            sizes="100%"
            className="object-contain"
          />
        </div>
      ) : (
        <div className="w-32 aspect-[5/6] relative bg-slate-100 rounded-md overflow-hidden">
          <span>
            <BookAudioIcon className="w-full h-full" />
          </span>
        </div>
      )}

      <div className="flex-1 space-y-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-800">
            {cart?.book_data?.title}
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            by {cart?.book_data?.authors}
          </p>
          <p className="text-sm text-slate-600 font-medium">
            Edition: {cart?.book_data?.edition}
          </p>
        </div>
        <p className="text-base font-bold text-slate-900">{cart.book_type}</p>

        <div className="flex items-center gap-x-2">
          <p className="text-base font-semibold">Quantity: </p>

          <span className="font-medium text-base select-none">
            {cart.quantity}
          </span>
        </div>
      </div>
      <div>
        <p className="text-base font-bold">
          {formatPrice(+cart?.book_data?.price)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
