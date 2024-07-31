import Logo from "@/components/navbar/logo";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center pt-28 max-w-2xl mx-auto p-4 text-center gap-y-6">
      <Link href="/" className="mb-14">
        <Logo />
      </Link>

      <FaCheckCircle className="w-12 h-12 text-[var(--brand-color-success)]" />
      <h1 className="text-3xl tracking-tight text-slate-800 font-semibold">
        Thank You
      </h1>
      <p className="text-base text-slate-500">
        Welcome to <strong>SimpliTaught</strong>! Your account has been
        successfully created. Dive right in and explore all that we have to
        offer. If you have any questions, our support team is here to help.
        Enjoy your journey with us!
      </p>
      <Link
        href="/auth/signin"
        className="text-base text-[var(--brand-color)] tracking-tighter hover:underline"
      >
        Sign in
      </Link>
    </div>
  );
};

export default SuccessPage;
