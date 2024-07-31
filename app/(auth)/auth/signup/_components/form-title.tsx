"use client";

import { useSearchParams } from "next/navigation";

const FormTitle = () => {
  const searchParams = useSearchParams();
  const userRole = searchParams?.get("role") as "student" | "educator" | null;
  if (userRole === "student") {
    return (
      <h2 className="text-2xl font-bold md:mb-8 text-center md:text-left">
        Sign up as a Student
      </h2>
    );
  }
  if (userRole === "educator") {
    return (
      <h2 className="text-2xl font-bold md:mb-8 text-center md:text-left">
        Sign up as an Educator
      </h2>
    );
  }
  return (
    <h2 className="text-2xl font-bold md:mb-8 text-center md:text-left">
      Sign up as a Student
    </h2>
  );
};

export default FormTitle;
