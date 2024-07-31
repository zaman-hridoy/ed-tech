"use client";

import * as animationData from "@/public/lottie_files/not-found-page.json";
import Link from "next/link";
import LottieAnimation from "./lottie-animation";

const NotFoundComp = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto px-6">
      <LottieAnimation
        style={{ width: 450, height: 450 }}
        animationData={animationData}
      />
      <div className="space-y-6 text-center">
        <p className="text-sm md:text-base text-slate-600 font-medium">
          Ooops! The page you were looking for {`doesn't`} exist. Try going back
          to the previous page or{" "}
          <Link href={"/contact-us"} className="text-[var(--brand-color)]">
            Contact Us
          </Link>{" "}
          for more information
        </p>
        <Link
          href="/"
          className="bg-[var(--brand-color)] text-white px-10 py-4 inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundComp;
