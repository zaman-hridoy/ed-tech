import { create } from "zustand";

interface AppStoreType {
  showChatMembersPanel: boolean;
  handleToggleChatmembersPanel: () => void;
}

export const useAppSettings = create<AppStoreType>((set) => ({
  showChatMembersPanel: false,
  handleToggleChatmembersPanel: () =>
    set((state) => ({ showChatMembersPanel: !state.showChatMembersPanel })),
}));
