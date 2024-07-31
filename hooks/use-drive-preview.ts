import { TreeNodeType } from "@/lib/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type DriveType = "MY_DRIVE" | "EXAM_LIBRARY";

interface DrivePreviewType {
  type: DriveType | null;
  data: TreeNodeType | null;
  onSelectFile: (type: DriveType, data: TreeNodeType) => void;
  onFileClose: () => void;
}

export const useDrivePreview = create<DrivePreviewType>()(
  devtools(
    (set) => ({
      type: null,
      data: null,
      onSelectFile: (type: DriveType, data: TreeNodeType) =>
        set({ type, data }),
      onFileClose: () => set({ type: null, data: null }),
    }),
    {
      name: "drive-preview-modal",
    }
  )
);
