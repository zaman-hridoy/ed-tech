"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import BookDetailsTab from "./book-details-tab";
import ContentsTab from "./contents-tab";

type TabType = "Details" | "Table of Contents" | "Accessibility";

interface Props {
  vbid: string;
}

const BookMetaSection = ({ vbid }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>("Details");

  return (
    <div className="mt-10">
      <div className="flex gap-x-4">
        <Button
          variant={activeTab === "Details" ? "primary" : "ghost"}
          onClick={() => setActiveTab("Details")}
        >
          Details
        </Button>
        <Button
          variant={activeTab === "Table of Contents" ? "primary" : "ghost"}
          onClick={() => setActiveTab("Table of Contents")}
        >
          Table of Contents
        </Button>
        {/* <Button
          variant={activeTab === "Accessibility" ? "primary" : "ghost"}
          onClick={() => setActiveTab("Accessibility")}
        >
          Accessibility
        </Button> */}
      </div>
      <Separator className="mt-1 mb-4" />
      {activeTab === "Details" && <BookDetailsTab vbid={vbid} />}
      {activeTab === "Table of Contents" && <ContentsTab vbid={vbid} />}
    </div>
  );
};

export default BookMetaSection;
