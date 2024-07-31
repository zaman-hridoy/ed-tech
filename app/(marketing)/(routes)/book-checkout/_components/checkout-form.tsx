"use client";

import { Button } from "@/components/ui/button";
import axios from "@/lib/instance";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import RawAxios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Fragment, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  totalBill: number;
  onPaymentSuccess: () => void;
  cartIds: number[];
  addressId: number;
}

const CheckoutForm = ({
  totalBill,
  onPaymentSuccess,
  cartIds,
  addressId,
}: Props) => {
  const router = useRouter();
  const session = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState();

  const [loading, setLoading] = useState(false);

  const handleError = (error: any) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    try {
      const intentRes = await RawAxios.post(
        "/api/stripe-payment/create-payment-intent",
        {
          amount: totalBill,
          currency: "usd",
        }
      );

      const client_secret = intentRes.data?.client_secret;

      let domain = process.env.domain;
      let successUrl = `/book-checkout`;
      if (process.env.NODE_ENV === "development") {
        domain = "http://localhost:3000";
      }

      // Confirm the PaymentIntent using the details collected by the Payment Element
      const result = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        redirect: "if_required",
        confirmParams: {
          return_url: domain + successUrl,
        },
      });

      if (!!result.error) {
        // This point is only reached if there's an immediate error when
        // confirming the payment. Show the error to your customer (for example, payment details incomplete)
        handleError(result.error);
        toast.error(JSON.stringify(result.error));
      } else {
        // Your customer is redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer is redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.

        console.log({ result });
        if (result.paymentIntent.client_secret) {
          console.log("checking...");
          checkPaymentStatus(result.paymentIntent.client_secret);
        }

        setLoading(false);
        onPaymentSuccess();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const checkPaymentStatus = (clientSecret: string) => {
    stripe
      ?.retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        console.log({ paymentIntent });
        switch (paymentIntent?.status) {
          case "succeeded":
            // succes-> order book
            handleOrderBooks();
            break;
          case "processing":
            toast.custom((t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex items-center gap-4">
                  <Loader2 className="animate-spin" />
                  <p>Processing...</p>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            ));
            break;

          default:
            toast.error("Payment failed. Please try another payment method.");
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOrderBooks = async () => {
    try {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex items-center gap-4">
            <Loader2 className="animate-spin" />
            <p>Processing...</p>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      const payload = {
        userId: session?.data?.user?.userId,
        name: session?.data?.user?.name,
        email: session?.data?.user?.email,
        cart_id: cartIds,
        address_id: addressId,
        weekendDelivery: "",
        new_deliverystatus: "Processing",
      };
      const res = await axios
        .post(`/auth/users/submit-order`, payload)
        .then((res) => res.data);
      router.push(
        `/book-checkout/order-success?order_id=${res.order?.order_id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* <SuccessModal visible={openSuccessModal} /> */}

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <PaymentElement id="book-payment" />

        <Button variant="primary" disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 animate-spin transition" />}
          {!loading && <>Order now</>}
        </Button>

        <div>
          {message && (
            <p className="text-[var(--brand-color-alert)] text-base tracking-tight">
              {message}
            </p>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default CheckoutForm;
