// src/store/requestStore.ts
import { create } from "zustand";
import { RequestState } from "@/types/requests"; // Adjust path if needed

export const useRequestStore = create<RequestState>((set) => ({
  id: null,
  status: null,
  // The parameters for this action are now more strictly typed
  setRequestData: (id, status) => set({ id, status }),
}));
