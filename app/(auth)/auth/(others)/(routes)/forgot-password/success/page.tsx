import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export const dynamic = "force-dynamic";

const ForgotSuccessPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center pt-28 max-w-2xl mx-auto p-4 text-center gap-y-6">
      <FaCheckCircle className="w-12 h-12 text-[var(--brand-color-success)]" />

      <h1 className="text-5xl text-slate-800 text-center font-semibold">
        Password recovery
      </h1>
      <p className="text-sm md:text-base text-slate-500 font-medium">
        Password recovery data has been sent to your email address.
      </p>

      <Link
        href="/"
        className="text-sm text-[var(--brand-color)] hover:underline"
      >
        Return to home
      </Link>
    </div>
  );
};

export default ForgotSuccessPage;
