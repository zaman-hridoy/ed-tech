import React from "react";
import NavigationSidebar from "./_components/navigation-sidebar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <div className="hidden md:block w-72 z-40 fixed inset-0">
        <NavigationSidebar />
      </div>
      <div className="md:pl-72 h-full">{children}</div>
    </main>
  );
};

export default ChatLayout;
