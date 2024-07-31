import React from "react";
import ActivityPanel from "./_components/activity-panel";
import PageNavLinks from "./_components/page-navlinks";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <div className="xl:pr-[386px] h-full">{children}</div>
      <ActivityPanel />
      <PageNavLinks />
    </div>
  );
};

export default layout;
