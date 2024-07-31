"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

const AuthFrame = () => {
  const searchParams = useSearchParams();
  const userRole = searchParams?.get("role") as "student" | "educator" | null;
  if (userRole === "student") {
    return (
      <Image src="/images/signup/student.svg" fill alt="sign in" priority />
    );
  }
  if (userRole === "educator") {
    return (
      <Image src="/images/signup/educator.svg" fill alt="sign in" priority />
    );
  }
  return <Image src="/images/signup/student.svg" fill alt="sign in" priority />;
};

export default AuthFrame;
