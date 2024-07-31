import React from "react";
import NavWithLogo from "./_components/nav-with-logo";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <NavWithLogo />
      {children}
    </div>
  );
};

export default layout;
