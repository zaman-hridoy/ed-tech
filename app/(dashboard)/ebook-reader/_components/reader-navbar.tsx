"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ReaderNavbar = () => {
  const router = useRouter();
  return (
    <nav className="px-4 py-2 bg-[var(--brand-color)] flex flex-row justify-between items-center gap-x-2 md:gap-x-6 fixed top-0 left-0 right-0 z-50">
      <Button variant="primary" onClick={() => router.push("/s/dashboard")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Button>

      <Link href="/">
        <div className="relative w-[147px] h-[30px] lg:w-[167px] lg:h-[40px]">
          <Image
            src="/logos/auth-logo/logo.svg"
            alt="Simplitaught"
            fill
            priority
            className="object-contain"
          />
        </div>
      </Link>

      <Button variant="primary" disabled className="opacity-0 invisible">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>
    </nav>
  );
};

export default ReaderNavbar;
