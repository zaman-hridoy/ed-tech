"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { LuBookCopy } from "react-icons/lu";
import BookItemWrapper from "./book-item-wrapper";

const PurchasedBooks = () => {
  const { data } = useSession();
  const state = useQuery({
    queryKey: [`current_semester_books_${data?.user?.userId}`],
    queryFn: () =>
      axios
        .get(`/auth/users/book-purchased/${data?.user?.userId}`)
        .then((res) => {
          if (res.data?.success) {
            const bookData: any[] = res.data?.data?.filter(
              (item: any) => item.ownership_type !== "hardcopy"
            );
            return bookData;
          }
          return [];
        }),
    enabled: !!data,
    refetchOnWindowFocus: false,
  });

  const [activeType, setActiveType] = useState<"all" | "rented" | "lifetime">(
    "all"
  );

  const [activeList, setActiveList] = useState<any[]>([]);
  useEffect(() => {
    const bookList = state.data || [];
    const rented_list = state.data
      ? state.data.filter((b) => b.ownership_type === "rented")
      : [];
    const lifetime_list = state.data
      ? state.data.filter((b) => b.ownership_type === "lifetime")
      : [];
    if (activeType === "lifetime") {
      setActiveList(lifetime_list);
    } else if (activeType === "rented") {
      setActiveList(rented_list);
    } else {
      setActiveList(bookList);
    }
  }, [activeType, state.data]);

  if (state.status === "pending") {
    return (
      <div className="bg-white rounded-md p-4 w-full min-h-[450px] shrink-0 flex flex-col">
        <h4 className="text-sm text-slate-500 font-semibold">
          Purchased Books
        </h4>
        <Separator className="my-2" />

        <div className="flex-1 flex flex-col items-center justify-center h-full space-y-2 select-none">
          <Loader2 className="w-14 h-14 animate-spin text-slate-300" />
        </div>
      </div>
    );
  }

  if (state.status === "error" || state.data?.length === 0) {
    return (
      <div className="bg-white rounded-md p-4 w-full min-h-[450px] shrink-0 flex flex-col">
        <h4 className="text-sm text-slate-500 font-semibold">
          Purchased Books
        </h4>
        <Separator className="my-2" />

        <div className="flex-1 flex flex-col items-center justify-center h-full space-y-2 select-none">
          <LuBookCopy className="w-14 h-14 text-slate-200" />
          <p className="text-sm text-slate-400 tracking-tight font-medium">
            No books found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md p-4 w-full min-h-[450px] shrink-0 flex flex-col">
      <div className="flex items-center gap-x-2">
        <h4 className="text-sm text-slate-500 font-semibold">
          Purchased Books
        </h4>
        <div className="ml-auto flex items-center gap-x-2">
          <Button
            size="sm"
            variant={activeType === "all" ? "primary" : "secondary"}
            onClick={() => setActiveType("all")}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={activeType === "rented" ? "primary" : "secondary"}
            onClick={() => setActiveType("rented")}
          >
            On Rent
          </Button>
          <Button
            size="sm"
            variant={activeType === "lifetime" ? "primary" : "secondary"}
            onClick={() => setActiveType("lifetime")}
          >
            Lifetime
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-[400px] overflow-y-auto no-scrollbar pr-1">
        {activeList.map((book) => (
          <BookItemWrapper
            key={book.vbid}
            vbid={book.vbid}
            ownership_type={book.ownership_type}
          />
        ))}
      </div>
    </div>
  );
};

export default PurchasedBooks;
