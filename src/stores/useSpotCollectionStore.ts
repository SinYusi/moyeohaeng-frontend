import { create } from "zustand";

export interface SpotCollectionItem {
  id: string;
  category: string;
  placeName: string;
  address: string;
  placeId: string;
  latitude: number;
  longitude: number;
  addedAt: string;
}

interface SpotCollectionState {
  collections: SpotCollectionItem[];
  addToCollection: (item: Omit<SpotCollectionItem, "id" | "addedAt">) => void;
  removeFromCollection: (id: string) => void;
  isInCollection: (placeId: string) => boolean;
  getCollectionByCategory: (category: string) => SpotCollectionItem[];
}

export const useSpotCollectionStore = create<SpotCollectionState>()((set, get) => ({
  collections: [],

  addToCollection: (item) => {
    const newItem: SpotCollectionItem = {
      ...item,
      id: `collection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString(),
    };

    set((state) => ({
      collections: [...state.collections, newItem],
    }));

    console.log("장소 모음에 추가되었습니다:", newItem.placeName);
  },

  removeFromCollection: (id) => {
    set((state) => ({
      collections: state.collections.filter((item) => item.id !== id),
    }));
  },

  isInCollection: (placeId) => {
    const { collections } = get();
    return collections.some((item) => item.placeId === placeId);
  },

  getCollectionByCategory: (category) => {
    const { collections } = get();
    return collections.filter((item) => item.category === category);
  },
}));
