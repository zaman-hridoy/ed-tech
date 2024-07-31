import { create } from "zustand";

interface AlanStoreType {
  commandData: any;
  handleSetCommandData: (cmds: any) => void;
}

export const useAlanCommand = create<AlanStoreType>((set) => ({
  commandData: null,
  handleSetCommandData: (cmds) => set((state) => ({ commandData: cmds })),
}));
