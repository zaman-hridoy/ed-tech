"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { useQueryClient } from "@tanstack/react-query";
import { BookAudioIcon, Loader2, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  cart: any;
}

const CartItem = ({ cart }: Props) => {
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
    <div className="flex gap-8 border-b pb-6">
      {cart.book_data?.cover_image ? (
        <div className="w-32 aspect-[5/6] relative bg-slate-100 rounded-md overflow-hidden">
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
        <p className="text-sm font-bold text-[var(--brand-color)]">In Stock</p>

        <div className="flex items-center gap-x-2">
          <p className="text-base font-semibold">Quantity: </p>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8"
            disabled={cart.quantity === 1 || isIncreasing || isDecreasing}
            onClick={() => onUpdateQuantity(cart.quantity - 1, "decrease")}
          >
            {isDecreasing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MinusIcon className="h-4 w-4" />
            )}
          </Button>
          <span className="font-medium text-base select-none">
            {cart.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8"
            disabled={cart.quantity >= 30 || isIncreasing || isDecreasing}
            onClick={() => onUpdateQuantity(cart.quantity + 1, "increase")}
          >
            {isIncreasing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="link"
            size="sm"
            className="text-rose-400"
            onClick={() => handleRemove(cart.id)}
          >
            {isRemoving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span>Delete</span>
            )}
          </Button>
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
