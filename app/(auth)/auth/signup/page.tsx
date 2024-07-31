import Logo from "@/components/navbar/logo";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MemberOptions from "../signin/_components/member-options";
import AuthFrame from "./_components/auth-frame";
import AuthTitle from "./_components/auth-title";
import FormTitle from "./_components/form-title";
import SignupForm from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up to Start Learning or Teaching - SimpliTaught.",
  description:
    "Sign up today and create your free account on SimpliTaught to start curating, collaborating and learning.",
};

function SignupPage(props: any) {
  return (
    <div className="flex flex-col h-full py-16">
      <div className="hidden fixed z-20 inset-0 md:w-[340px] lg:w-[400px]  md:flex bg-[var(--brand-color-secondary)] flex-col gap-y-6">
        <div className="p-12 pb-0">
          <Link href="/">
            <div className="relative w-[210px] h-[40px]">
              <Image
                src="/logos/auth-logo/logo.svg"
                alt="SimpliTaught"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="px-12 pb-4">
          <Suspense fallback={<div>Loading...</div>}>
            <AuthTitle />
          </Suspense>
        </div>
        <div className="relative flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <AuthFrame />
          </Suspense>
        </div>
        <div className="px-12 pb-8 pt-5">
          <p className="text-base font-semibold text-white">
            © {new Date().getFullYear()} - SimpliTaught
          </p>
        </div>
      </div>
      <MemberOptions page="Sign in" />
      {/* form options */}
      <div className="md:pl-[340px] lg:pl-[400px] flex flex-col w-full h-full">
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          <div className="max-w-sm mx-auto">
            <div className="md:hidden flex items-center justify-center mb-9">
              <Logo />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <FormTitle />
            </Suspense>

            <p className="text-center text-sm text-slate-500 md:hidden pb-8 mt-2">
              Explore the new world of online education, <br />
              personalized and completely free!
            </p>
            <Suspense fallback={<div>Loading...</div>}>
              <SignupForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
