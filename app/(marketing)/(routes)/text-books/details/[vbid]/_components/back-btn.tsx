"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackBtn = () => {
  const router = useRouter();
  return (
    <Button
      variant="link"
      className="text-base text-[var(--brand-color)] hover:text-[var(--brand-color)] p-0"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </Button>
  );
};

export default BackBtn;
