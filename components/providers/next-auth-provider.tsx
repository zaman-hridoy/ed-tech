"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return <UILoader />;
  // }

  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
