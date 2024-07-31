"use client";

import { Button } from "@/components/ui/button";
import { useSticky } from "@/hooks/useSticky";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ExamLibraryTab from "./exam-library-tab";
import FavouritesTab from "./favorites-tab";

type TabType = "Favorites" | "Exam Library";

export function StudentDriveSection() {
  const { isSticky } = useSticky(100);
  const [activeTab, setActiveTab] = useState<TabType>("Favorites");

  return (
    <div
      className={cn(
        "hidden group shrink-0 w-96 h-full xl:flex flex-col bg-white px-2 pb-2",
        isSticky && "sticky top-0 pt-16"
      )}
    >
      <div className="flex items-center gap-x-2 border-b px-4 py-2">
        <Button
          variant={activeTab === "Favorites" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("Favorites")}
        >
          Favorites
        </Button>
        <Button
          variant={activeTab === "Exam Library" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("Exam Library")}
        >
          Exam Library
        </Button>
      </div>
      {activeTab === "Favorites" && <FavouritesTab />}
      {activeTab === "Exam Library" && <ExamLibraryTab />}
    </div>
  );
}
