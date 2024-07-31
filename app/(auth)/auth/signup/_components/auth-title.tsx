"use client";

import { useSearchParams } from "next/navigation";

const AuthTitle = () => {
  const searchParams = useSearchParams();
  const userRole = searchParams?.get("role") as "student" | "educator" | null;
  if (userRole === "student") {
    return (
      <h1 className="text-3xl font-semibold text-white">
        Simplify Learning Instantly
      </h1>
    );
  }
  if (userRole === "educator") {
    return (
      <h1 className="text-3xl font-semibold text-white">
        Students Learn, Educators Earn. Create, Curate & Teach
      </h1>
    );
  }
  return (
    <h1 className="text-3xl font-semibold text-white">
      Simplify Learning Instantly
    </h1>
  );
};

export default AuthTitle;
