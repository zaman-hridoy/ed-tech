"use client";

import Logo from "../public-navbar/logo";

const UILoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  );
};

export default UILoader;
