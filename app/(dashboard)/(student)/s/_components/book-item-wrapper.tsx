"use client";

import CourseFileSkeleton from "@/components/skeletons/course-file-skeleton";
import VitalBookCard from "@/components/vital-book-card";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface Props {
  vbid: string;
  ownership_type: "rented" | "lifetime";
}

const BookItemWrapper = ({ vbid, ownership_type }: Props) => {
  const { data } = useSession();
  const state = useQuery({
    queryKey: [`book_${vbid}`],
    queryFn: () =>
      axios.get(`/content/getVitalSourcebyVBid/${vbid}`).then((res) => {
        if (res.data?.book) {
          return res.data?.book;
        }
        return null;
      }),
    refetchOnWindowFocus: false,
  });

  const bookData = state.data || null;

  if (state.status === "pending") {
    return <CourseFileSkeleton />;
  }

  return (
    <VitalBookCard
      book={bookData}
      isPurchased={true}
      borderRounded={true}
      ownership_type={ownership_type}
    />
  );
};

export default BookItemWrapper;
