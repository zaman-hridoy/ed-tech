"use client";

import EmptySection from "@/components/empty-section";
import { useDrivePreview } from "@/hooks/use-drive-preview";
import { BiDetail } from "react-icons/bi";
import DrivePreview from "./drive-components/drive-preview";
import ExamPreview from "./exam-components/exam-preview";

const PreviewSection = () => {
  const { type } = useDrivePreview();
  return (
    <div className="w-full h-full">
      {!type && (
        <div className="w-full h-full flex items-center justify-center">
          <EmptySection
            icon={<BiDetail />}
            emptyText="Select a file to view info."
          />
        </div>
      )}

      {type === "MY_DRIVE" && <DrivePreview />}
      {type === "EXAM_LIBRARY" && <ExamPreview />}
    </div>
  );
};

export default PreviewSection;
