"use client";

import { DetailsChapterSection } from "./details-chapter-section";
import EditChapterSection from "./edit-chapter-section";
import { FileAddSection } from "./file-add-section";

const CollectionEditor = () => {
  return (
    <div className="h-full">
      <div className="h-full fixed inset-0 lg:w-[260px] xl:w-[280px] 2xl:w-[300px] bg-white shadow-md shadow-[var(--brand-shadow)] border p-4 pt-[70px]">
        <DetailsChapterSection />
      </div>
      <div className="h-full lg:pl-[260px] xl:pl-[280px] 2xl:pl-[300px] pr-0 lg:pr-[300px] xl:pr-[350px] 2xl:pr-[380px]">
        <div className="h-full pt-[60px]">
          <EditChapterSection />
        </div>
      </div>
      <div className="h-full hidden lg:block lg:w-[300px] xl:w-[350px] 2xl:w-[380px] fixed top-0 right-0 bg-white shadow-md shadow-[var(--brand-shadow)] border p-4 pt-[70px]">
        <FileAddSection />
      </div>
    </div>
  );
};

export default CollectionEditor;
