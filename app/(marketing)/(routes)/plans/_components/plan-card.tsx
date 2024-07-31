"use client";

import { formatPrice } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CheckIcon, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";

interface Props {
  features: string[];
  name: string;
  price: number;
  priceId: string;
}

const PlanCard = ({ features, name, price, priceId }: Props) => {
  const { data, status } = useSession();
  const router = useRouter();
  const subscription = useQuery({
    queryKey: ["getUserSubscription"],
    queryFn: () =>
      axios
        .get("/profile/getUserSubscription", {
          headers: {
            Authorization: data?.user?.accessToken,
          },
        })
        .then((res) => res.data?.request || null),
    enabled: status === "authenticated",
  });

  console.log({ subscription });

  const [loading, setLoading] = useState(false);
  const getSubscriptionUrl = () => {
    if (subscription.data) {
      const currentPlan = subscription?.data?.plan_name;
      if (name === "Premium" && currentPlan === "Basic") {
        setLoading(true);
        axios
          .post("/profile/create-checkout-session", {
            priceId: priceId,
            userId: data?.user?.userId,
            stripCustomerId: subscription?.data?.stripCustomerId,
            refund_requested: false,
            refund_subscription_id: subscription?.data?.stripeSubscriptionId,
            email: data?.user?.email,
          })
          .then((res) => {
            if (res.data.success) {
              router.replace(res.data.session);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (name === "Basic" && currentPlan === "Premium") {
        // url = "/profile/create-checkout-session-with-extra-drive";
        setLoading(true);
        axios
          .post("/profile/downgrade", {
            basicPriceId: priceId,
            userId: data?.user?.userId,
            stripCustomerId: subscription?.data?.stripCustomerId,
            subscriptionId: subscription?.data?.stripeSubscriptionId,
          })
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data?.message);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            toast.error(err?.response?.data?.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      setLoading(true);
      axios
        .post("/profile/create-checkout-session", {
          priceId: priceId,
          userId: data?.user?.userId,
          email: data?.user?.email,
        })
        .then((res) => {
          if (res.data.success) {
            router.replace(res.data.session);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const getSubscribeBtnText = () => {
    if (subscription.data) {
      const currentPlan = subscription?.data?.plan_name;
      if (currentPlan === "Premium" && name === "Basic") {
        return "Downgrade";
      } else if (currentPlan === "Basic" && name === "Premium") {
        return "Upgrade";
      }
    } else {
      return "Subscribe";
    }
  };

  const [manageLoader, setManageLoader] = useState(false);
  const onManageSubscription = (stripCustomerId: string) => {
    setManageLoader(true);
    axios
      .post("/profile/create-portal-session", {
        stripCustomerId,
      })
      .then((res) => {
        if (res.data.success) {
          router.replace(res.data?.session);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setManageLoader(false);
      });
  };

  return (
    <div className="drop-shadow-md rounded-lg p-6 bg-white space-y-8 flex flex-col">
      <div className="text-center space-y-4 relative">
        {subscription?.data?.plan_name === name && (
          <div className="w-10 h-10 absolute top-0 right-0 flex items-center justify-center rounded-full drop-shadow-md bg-[var(--brand-color-success)] text-white">
            <CheckIcon className="w-5 h-5 text-inherit" />
          </div>
        )}

        <p className="text-2xl text-inherit font-medium tracking-tight text-slate-600">
          {name}
        </p>
        <h2 className="text-5xl text-inherit font-semibold tracking-tight text-slate-800">
          {formatPrice(price)} <sup>/month</sup>
        </h2>
        <div className="w-1/3 h-1 bg-[var(--brand-color)] mx-auto rounded-md" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-between space-y-8">
        <div className="flex-1">
          <ul className="space-y-4">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex gap-x-3 text-base font-medium tracking-tight text-slate-600"
              >
                <FaCheck className="w-4 h-4 shrink-0 mt-1 text-[var(--brand-color-success)]" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* {status === "loading" || subscription.isLoading ? (
          <button
            disabled={status === "loading" || subscription.isLoading}
            className="w-full drop-shadow-sm rounded-lg bg-white text-[var(--brand-color)] px-4 py-3 text-base font-medium border-0 text-center flex items-center justify-center"
          >
            <Loader2 className="animate-spin w-4 h-4" />
          </button>
        ) : (
          <a className="w-full drop-shadow-sm rounded-lg bg-white text-[var(--brand-color)] px-4 py-3 text-base font-medium border-0 text-center flex items-center justify-center">
            Subscribe
          </a>
        )} */}
        {subscription?.data?.plan_name === name ? (
          <button
            disabled={
              status === "loading" ||
              subscription.isLoading ||
              loading ||
              manageLoader
            }
            className="w-full drop-shadow-sm rounded-lg bg-white text-[var(--brand-color)] px-4 py-3 text-base font-medium border-2 border-[var(--brand-color)] text-center flex items-center justify-center"
            onClick={() =>
              onManageSubscription(subscription?.data?.stripCustomerId)
            }
          >
            {manageLoader ? <Loader2 className="w-4 h-4" /> : <>Unsubscribe</>}
          </button>
        ) : (
          <Fragment>
            {subscription?.data?.downgrade_date ? (
              <div className="text-[12px] text-[var(--brand-color-alert)] font-semibold whitespace-normal text-center">
                You have downgraded to <span>Basic</span> and will be started
                from{" "}
                {format(
                  new Date(subscription?.data?.downgrade_date),
                  "LLLL dd, yyyy"
                )}
              </div>
            ) : (
              <button
                disabled={
                  status === "loading" || subscription.isLoading || loading
                }
                className="w-full drop-shadow-sm rounded-lg bg-[var(--brand-color)] text-white px-4 py-3 text-base font-medium border-0 text-center flex items-center justify-center"
                onClick={getSubscriptionUrl}
              >
                {status === "loading" || subscription.isLoading || loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>{getSubscribeBtnText()}</>
                )}
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
