"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  page: "Sign in" | "Sign up";
}

const MemberOptions = ({ page }: Props) => {
  return (
    <div className="w-full fixed top-0 right-0 p-2 bg-background">
      <div className="flex items-center justify-end">
        <p className="text-base md:text-lg font-semibold">Not a member?</p>
        <div className="relative group">
          <Button
            variant="link"
            size="sm"
            className="text-base md:text-lg hover:no-underline text-[var(--brand-color)]"
          >
            {page === "Sign in" ? (
              <Link href="/auth/signin">{page}</Link>
            ) : (
              <>{page}</>
            )}

            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          {page === "Sign up" && (
            <div className="bg-white z-10 border shadow-md flex flex-col w-[210px] rounded-lg absolute right-0 top-full invisible opacity-0 scale-90 group-hover:opacity-100 group-hover:visible group-hover:scale-100 duration-300 origin-top">
              <p className="p-4 text-sm text-slate-500">
                Choose your path and Sign Up as either of the following types
              </p>
              <Button
                className="rounded-none justify-start text-base font-semibold hover:text-[var(--brand-color)] transition"
                variant="ghost"
              >
                <Link href="/auth/signup?role=student">As a Student</Link>
              </Button>
              <Button
                className="rounded-none justify-start text-base font-semibold hover:text-[var(--brand-color)] transition"
                variant="ghost"
              >
                <Link href="/auth/signup?role=educator">As an Educator</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberOptions;
