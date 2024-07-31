"use client";

import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddressTabContent from "./_components/address-tab-content";
import BuyUsingGrant from "./_components/buy-using-grant";
import CheckoutForm from "./_components/checkout-form";
import ItemReviewTab from "./_components/item-review-tab";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

type TabType = "address" | "items" | "payment";

const BookCheckoutPage = () => {
  const session = useSession();
  const [activeTab, setActiveTab] = useState<TabType>("address");
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const [selectedMethod, setPaymentMethod] = useState<"card" | "grant">("card");

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
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: Math.round(+cartState.data?.data?.total?.totalBill),
        currency: "usd",
      }}
    >
      <div className="pt-14 md:pt-16 lg:pt-20 pb-10">
        <Container>
          <div className="flex items-start gap-8">
            <div className="bg-white flex-1 shadow-sm rounded-md p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl md:text-2xl font-medium mb-2">
                  Checkout
                </h1>
                <p className="text-base font-medium">
                  ({cartState.data?.data?.cart?.length} items)
                </p>
              </div>
              <Separator />

              <Accordion
                type="single"
                defaultValue="address"
                collapsible
                className="w-full"
                onValueChange={(value: TabType) => setActiveTab(value)}
              >
                <AccordionItem value="address" className="py-4">
                  <AccordionTrigger>
                    <div>
                      {activeTab === "address" ? (
                        <div>
                          <h4 className="text-base font-medium tracking-tight text-slate-800">
                            1. Choose a shipping address
                          </h4>
                        </div>
                      ) : (
                        <div>
                          <h4>1. Shipping address</h4>

                          {/* {selectedAddress && (
                            <div
                              className={clsx(
                                "p-2 border-rounded-md cursor-pointer mb-2"
                              )}
                              style={{ textTransform: "capitalize" }}
                            >
                              <div className="flex align-items-center gap-2">
                                <div>
                                  <p className="font-base font-medium">
                                    {selectedAddress.full_name},{" "}
                                    {selectedAddress.address},{" "}
                                    {selectedAddress.city}-
                                    {selectedAddress.zipcode},{" "}
                                    {selectedAddress.state},{" "}
                                    {selectedAddress.country}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )} */}
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <AddressTabContent
                      onSelectAddress={(address) => setSelectedAddress(address)}
                      selectedAddress={selectedAddress}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item" className="py-4">
                  <AccordionTrigger>
                    <div>
                      {activeTab === "items" ? (
                        <h4 style={{ color: "var(--primary-color)" }}>
                          2. Review items and shipping
                        </h4>
                      ) : (
                        <div>
                          <h4>2. Items and shipping</h4>
                          {/* {cartItems.length > 0 && (
                            <p className="mt-2 ml-3">
                              {cartItems.length} Book(s) added
                            </p>
                          )} */}
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ItemReviewTab cartItems={cartState.data.data.cart || []} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="payment">
                  <AccordionTrigger className="py-4">
                    <div>
                      {activeTab === "payment" ? (
                        <h4 style={{ color: "var(--primary-color)" }}>
                          3. Choose a payment method
                        </h4>
                      ) : (
                        <h4>3. Payment method</h4>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="max-w-md">
                      <div className="flex gap-x-4 mb-8">
                        <Button
                          onClick={() => setPaymentMethod("card")}
                          variant={
                            selectedMethod === "card" ? "primary" : "secondary"
                          }
                        >
                          Credit or debit card
                        </Button>

                        <Button
                          onClick={() => setPaymentMethod("grant")}
                          variant={
                            selectedMethod === "grant" ? "primary" : "secondary"
                          }
                        >
                          Grants
                        </Button>
                      </div>
                      {selectedMethod === "card" && (
                        <CheckoutForm
                          totalBill={cartState.data?.data?.total?.totalBill}
                          onPaymentSuccess={() => {}}
                          cartIds={cartState.data.data.cart?.map(
                            (c: any) => c.id
                          )}
                          addressId={selectedAddress?.id}
                        />
                      )}

                      {selectedMethod === "grant" && (
                        <BuyUsingGrant
                          totalPrice={+cartState.data?.data?.total?.totalBill}
                        />
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="text-right">
                <p className="text-xl font-medium mt-2">
                  Subtotal ({cartState.data?.data?.cart?.length} items):{" "}
                  <strong>
                    {" "}
                    {formatPrice(+cartState?.data?.data?.total.totalPrices)}
                  </strong>
                </p>
              </div>
            </div>
            <div className="bg-white w-full md:w-96 shadow-sm rounded-md p-4">
              <p className="text-sm font-medium text-center">
                {`Choose a shipping address to continue checking out. You'll still
                have a chance to review and edit your order before it's final.`}
              </p>
              <Separator className="my-4" />
              <h4 className="text-xl font-semibold mb-3">Order Summary</h4>

              <div className="flex items-center justify-between text-base font-medium mb-1">
                <p>
                  Subtotal ({cartState?.data?.data?.cart?.length} item
                  {cartState?.data?.data?.cart?.length > 1 ? "s" : ""}):
                </p>
                <span>
                  {formatPrice(cartState?.data?.data?.total?.totalPrices)}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-medium">
                <p>Shipping & handling:</p>
                <span>
                  {selectedAddress
                    ? formatPrice(cartState?.data?.data?.total?.shipping)
                    : "--"}
                </span>
              </div>

              {/* <Separator className="my-4" />
              <div className="flex items-center justify-between text-base font-medium mb-1">
                <p>Total before tax:</p>
                <span>
                  {formatPrice(cartState?.data?.data?.total?.totalPrices)}
                </span>
              </div> */}
              <div className="flex items-center justify-between text-base font-medium">
                <p>Estimated tax to be collected:</p>
                <span>
                  {selectedAddress
                    ? formatPrice(cartState?.data?.data?.total?.totalTaxes)
                    : "--"}
                </span>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-xl font-medium">
                <h3>Order total:</h3>
                <span>
                  {selectedAddress
                    ? formatPrice(cartState?.data?.data?.total?.totalBill)
                    : "--"}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Elements>
  );
};

export default BookCheckoutPage;
