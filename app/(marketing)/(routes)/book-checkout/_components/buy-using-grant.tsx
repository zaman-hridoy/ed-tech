// Schema

import { Button } from "@/components/ui/button";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import GrantItem from "./grant-item";

interface Props {
  totalPrice: any;
}

function BuyUsingGrant({ totalPrice }: Props) {
  const session = useSession();

  const [selectedItem, setselectedItem] = useState(-1);

  const dashboardData = useQuery({
    queryKey: [`grant-amount`],
    queryFn: () =>
      axios
        .get(`/auth/users/student-dashboard/${session.data?.user?.email}`)
        .then((res) => {
          if (res.data?.success) {
            return res.data;
          }
          return null;
        }),
    enabled: !!session?.data,
    refetchOnWindowFocus: false,
  });

  const [loading, setLoading] = useState(false);

  const menuData = dashboardData.data
    ? Object.keys(dashboardData.data?.programSummaries).map((key) => ({
        id: key,
        ...dashboardData.data?.programSummaries[key],
      }))
    : [];

  const [isPurchaseable, setIsPurchaseable] = useState(false);
  useEffect(() => {
    if (!dashboardData.data) {
      return;
    }
    const grants = Object.keys(dashboardData.data?.programSummaries).map(
      (key) => ({
        id: key,
        ...dashboardData.data?.programSummaries[key],
      })
    );

    if (grants.length === 0) {
      return;
    }

    const isAbleToBuy = grants.every((g) => +g.remaining_amount > totalPrice);

    setIsPurchaseable(isAbleToBuy);
  }, [dashboardData, totalPrice]);

  if (dashboardData.status === "pending") {
    return (
      <div className="pt-14 md:pt-16 lg:pt-20 pb-10">
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin w-20 h-10" />
        </div>
      </div>
    );
  }

  if (isPurchaseable) {
    return (
      <div className="text-center">
        <h4 className="text-sm font-medium tracking-tight text-slate-500">
          {`You don't have enough grant to buy this book.`}
        </h4>
      </div>
    );
  }

  return (
    <div>
      {menuData.length > 0 ? (
        <h4 className="text-sm font-semibold tracking-tight text-slate-900">
          Chooses a program to buy:
        </h4>
      ) : (
        <div className="text-center">
          <h4 className="text-sm font-medium tracking-tight text-slate-500">
            {`You don't have enough grant to buy this book.`}
          </h4>
        </div>
      )}

      {menuData.length > 0 &&
        menuData.map((item) => (
          <GrantItem
            key={item.id}
            label={item?.program_name}
            value={`$${item.remaining_amount}`}
            onSelect={() => setselectedItem(item?.program_id)}
            isSelected={item?.program_id === selectedItem}
          />
        ))}
      <div className="text-right mt-5">
        <Button disabled={selectedItem === -1 || loading} type="submit">
          Order now
        </Button>
      </div>
    </div>
  );
}
export default BuyUsingGrant;
