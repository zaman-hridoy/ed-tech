import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ModalType =
  | "MOVE_DRIVE_FOLDER_AND_FILES"
  | "DRIVE_NAME_UPDATE_MODAL"
  | "EXAM_NAME_UPDATE_MODAL"
  | "CREATE_DRIVE_FOLDER"
  | "UPLOAD_DRIVE_FILES"
  | "DRIVE_FILE_VIEWER"
  | "EXAM_FILE_VIEWER"
  | "CREATE_EXAM_FOLDER"
  | "ADD_EXAM_CONTENT"
  | "EXAM_FOLDER_SHARE_MODAL"
  | "COURSE_FILE_VIEWER"
  | "CREATE_CHANNEL_MODAL"
  | "INVITE_CHANNEL_MODAL"
  | "EDIT_CHANNEL_MODAL"
  | "DELETE_MESSAGE_MODAL"
  | "SAVE_TO_EXAM_LIBRARY";

type ModalDataType = {};

interface ModalStoreType {
  type: ModalType | null;
  data: any;
  isOpen: boolean;
  onModalOpen: (type: ModalType, data?: ModalDataType) => void;
  onModalClose: () => void;
}

export const useModal = create<ModalStoreType>()(
  devtools(
    (set) => ({
      type: null,
      data: {},
      isOpen: false,
      onModalOpen: (type, data = {}) => set({ isOpen: true, type, data }),
      onModalClose: () => set({ type: null, isOpen: false }),
    }),
    {
      name: "simplitaught_modal",
    }
  )
);
