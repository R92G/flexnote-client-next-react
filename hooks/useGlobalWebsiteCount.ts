import { create } from "zustand";

interface WebsiteAddedStore {
  isWebsiteAddedContext: boolean;
  onAdd: () => void;
}

const useGlobalWebsiteCount = create<WebsiteAddedStore>((set) => ({
  isWebsiteAddedContext: false,
  onAdd: () => set({ isWebsiteAddedContext: true }),
}));

export default useGlobalWebsiteCount;
