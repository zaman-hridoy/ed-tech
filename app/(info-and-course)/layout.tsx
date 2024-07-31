import React from "react";

const AddInfoLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full flex flex-col">{children}</div>;
};

export default AddInfoLayout;
