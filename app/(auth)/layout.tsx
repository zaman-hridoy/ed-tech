import React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return <div className="h-full">{children}</div>;
};

export default AuthLayout;
