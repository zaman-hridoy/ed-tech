"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import {
  AmazonPriceType,
  AmazonVarientsType,
  VitalBookType,
  VitalVarientsType,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InfoIcon, Loader2, MinusIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import PriceItem from "./price-item";

const getSelectedPrices = (variant: VitalVarientsType) => {
  if (!variant) {
    return {
      publisher_price: 0,
      digital_price: 0,
    };
  }
  const publisherPrice = variant.prices.find(
    (price) => price.type === "publisher-list-price" && price.currency === "USD"
  );
  const digitalPrice = variant.prices.find(
    (price) => price.type === "digital-list-price" && price.currency === "USD"
  );

  return {
    publisher_price: publisherPrice ? +publisherPrice.value : 0,
    digital_price: digitalPrice ? +digitalPrice.value : 0,
  };
};

const getExpiresDate = (priceObj: any) => {
  if (priceObj?.duration === "perpetual") return null;

  console.log(priceObj);
  const date = new Date();
  date.setDate(date.getDate() + +priceObj?.duration);

  // return format(new Date(date), "MMM dd, yyyy");
  return null;
};

const renderSaving = (variant: VitalVarientsType) => {
  if (!variant) return null;
  const prices = getSelectedPrices(variant);

  if (prices.publisher_price > prices.digital_price) {
    return (
      <p className="flex items-center text-sm text-zinc-500 justify-center gap-x-2">
        Savings{" "}
        <strong>
          {formatPrice(prices.publisher_price - prices.digital_price)}
        </strong>{" "}
        <ActionTooltip
          label={`Print List Pricing is ${formatPrice(
            prices.publisher_price
          )}. Purchasing with SinpliTaught saves you ${formatPrice(
            prices.publisher_price - prices.digital_price
          )}.`}
        >
          <InfoIcon className="w-5 h-5 cursor-pointer" />
        </ActionTooltip>
      </p>
    );
  } else {
    return null;
  }
};

interface Props {
  book: VitalBookType;
  variants_for_rent: VitalVarientsType[];
  variants_for_order: (VitalVarientsType | AmazonVarientsType)[];
}

const RentBuyCard = ({
  book,
  variants_for_order,
  variants_for_rent,
}: Props) => {
  const session = useSession();
  const queryClient = useQueryClient();
  const [selectedVariant, setSelectedVariant] =
    useState<VitalVarientsType | null>(null);
  const [selectedOrdervariant, setSelectOrderVariant] =
    useState<AmazonPriceType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const cartState = useQuery({
    queryKey: ["show-cart-list"],
    queryFn: () =>
      axios.post("/auth/users/get-cart-data", {
        user_id: session.data?.user?.userId,
      }),
    enabled: !!session.data,
  });

  useEffect(() => {
    if (variants_for_rent && variants_for_rent.length > 0) {
      setSelectedVariant(variants_for_rent[0]);
    }
  }, [variants_for_rent]);

  const cartItems: any[] = cartState.data?.data?.cart || [];

  const isAddedToCart = cartItems.find((c) => c.book_id === book.vbid);

  useEffect(() => {
    if (isAddedToCart && variants_for_order.length > 0) {
      const price_list: any[] = variants_for_order[0].prices;
      const addedItem = price_list.find(
        (p) => p.type === isAddedToCart.book_type
      );
      if (addedItem) {
        setSelectOrderVariant(addedItem);
      }
    }
  }, [isAddedToCart, variants_for_order]);

  const [cartLoading, setCartLoader] = useState(false);
  const handleAddToCart = () => {
    if (!selectedOrdervariant || !session.data) return;
    const payload = {
      userId: session.data?.user?.userId,
      vbid: book.vbid,
      quantity: quantity,
      book_type: selectedOrdervariant?.type,
      book_data: {
        title: book?.title || "",
        price: selectedOrdervariant?.value,
        cover_image: book?.resource_links?.cover_image || "",
        edition: book?.edition,
        authors: "",
        isbn: "",
      },
    };

    payload.book_data["authors"] = book?.contributors
      ?.map((a: any) => a.name)
      .join(", ");

    payload.book_data["isbn"] =
      book.identifiers?.e_isbn ||
      book.identifiers?.e_isbn_13 ||
      book.identifiers?.eisbn_canonical ||
      book.identifiers?.eisbn_canonical;

    // console.log({ payload, cartData });
    setCartLoader(true);
    axios
      .post("/auth/users/add-to-cart", payload)
      .then((res) => {
        cartState.refetch();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setCartLoader(false);
      });
  };

  return (
    <div className="shrink-0 w-full shadow-md p-4 bg-white rounded-md lg:w-96">
      <p className="text-sm md:text-base text-zinc-600 text-center">
        Rent or Purchase eTextbook
      </p>

      <div className="space-y-4 mt-4">
        {variants_for_rent.map((variant) => (
          <PriceItem
            key={variant.duration}
            variant={variant}
            isSelected={selectedVariant?.duration === variant.duration}
            onSelect={() => {
              setSelectOrderVariant(null);
              setSelectedVariant(variant);
            }}
          />
        ))}
        {selectedVariant && (
          <Fragment>
            <div className="py-4">
              {getExpiresDate(selectedVariant) && (
                <p className="text-center text-sm text-zinc-500">
                  Expires on: {getExpiresDate(selectedVariant)}
                </p>
              )}

              {selectedVariant && renderSaving(selectedVariant)}
              {selectedVariant && (
                <h4 className="text-center text-xl md:text-2xl font-semibold text-zinc-800 mt-4">
                  {formatPrice(
                    getSelectedPrices(selectedVariant).digital_price
                  )}{" "}
                  USD
                </h4>
              )}
            </div>

            <Button
              variant="primary"
              className="w-full hover:scale-105 transition-all mb-4"
              size="sm"
            >
              Checkout
            </Button>
          </Fragment>
        )}

        {variants_for_order && variants_for_order?.length > 0 && (
          <Fragment>
            <Separator className="my-4 block" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              {variants_for_order[0].prices?.map((price: any) => (
                <button
                  key={price.type}
                  className={cn(
                    "border-2 px-4 py-2 rounded-md flex flex-col hover:border-[var(--brand-color)] hover:bg-blue-200/50 text-base font-medium",
                    selectedOrdervariant?.type === price.type &&
                      "bg-blue-200/50 border-[var(--brand-color)]"
                  )}
                  onClick={() => {
                    setSelectedVariant(null);
                    setSelectOrderVariant(price);
                  }}
                >
                  <span>{price.type}</span>
                  <strong>{formatPrice(+price.value)}</strong>
                </button>
              ))}
            </div>
            <p className="font-medium text-xl text-[var(--brand-color-warning)]">
              In Stock
            </p>

            <div className="flex items-center gap-x-2">
              <p className="text-base font-semibold">Quantity: </p>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8"
                disabled={quantity === 1 || isAddedToCart}
                onClick={() => setQuantity((prev) => prev - 1)}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="font-medium text-base select-none">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8"
                onClick={() => setQuantity((prev) => prev + 1)}
                disabled={quantity >= 30 || isAddedToCart}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>

            {selectedOrdervariant && (
              <Fragment>
                {isAddedToCart ? (
                  <Link href="/cart" className="block">
                    <Button
                      variant="secondary"
                      className="w-full hover:scale-105 transition-all mb-4"
                      size="sm"
                    >
                      Go to cart
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="primary"
                    className="w-full hover:scale-105 transition-all mb-4"
                    size="sm"
                    onClick={handleAddToCart}
                  >
                    {cartLoading && (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    )}
                    Add to Cart
                  </Button>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default RentBuyCard;
