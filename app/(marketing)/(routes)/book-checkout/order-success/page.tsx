"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  params: {
    order_id: string;
  };
}

const SuccessPage = ({ params }: Props) => {
  const { data, status } = useSession();
  const searchParams = useSearchParams();
  const order_id = searchParams?.get("order_id");

  if (status === "loading") {
    return (
      <div className="w-full h-full min-h-[450px] flex flex-col items-center py-28 max-w-2xl mx-auto p-4 text-center gap-y-6">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center py-28 max-w-2xl mx-auto p-4 text-center gap-y-6">
      <FaCheckCircle className="w-12 h-12 text-[var(--brand-color-success)]" />
      <p className="text-base tracking-tight text-slate-800 font-medium">
        Hey, {data?.user.name}
      </p>
      <h1 className="text-3xl tracking-tight text-slate-800 font-semibold">
        Your Order is Confirmed!
      </h1>
      <p className="text-base text-slate-500">
        {`We'll send you a shipping confirmation email as soon as your order ships.`}
      </p>
      <Link
        href={`/s/dashboard/orders/${order_id}`}
        className="text-base text-[var(--brand-color)] tracking-tighter hover:underline"
      >
        View Order
      </Link>
    </div>
  );
};

export default SuccessPage;
