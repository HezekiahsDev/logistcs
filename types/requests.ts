// src/types.ts

// The API response shape
export interface RequestResponse {
  id: string;
  status: "draft" | "submitted"; // Refined to the allowed values
}

// The shape of your Zustand store, including actions
export interface RequestState {
  id: string | null;
  status: "draft" | "submitted" | null;
  setRequestData: (id: string, status: "draft" | "submitted") => void;
}
