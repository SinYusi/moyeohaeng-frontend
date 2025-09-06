import { create } from "zustand";
import type { SpotCollectionItem } from "../types/spotCollectionItem";

interface SpotCollectionState {
  collections: SpotCollectionItem[];
  addToCollection: (item: Omit<SpotCollectionItem, "id" | "addedAt">) => void;
  removeFromCollection: (id: string) => void;
  updateCollection: (id: string, updates: Partial<SpotCollectionItem>) => void;
  toggleLike: (id: string) => void;
  isInCollection: (placeId: string) => boolean;
  getCollectionByCategory: (category: string) => SpotCollectionItem[];
}

export const useSpotCollectionStore = create<SpotCollectionState>()(
  (set, get) => ({
    collections: [],

    addToCollection: (item) => {
      const newItem: SpotCollectionItem = {
        ...item,
        // TODO: id, addedAt api 연결
        id: `collection_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      };

      set((state) => ({
        collections: [...state.collections, newItem],
      }));
    },

    removeFromCollection: (id) => {
      set((state) => ({
        collections: state.collections.filter((item) => item.id !== id),
      }));
    },

    updateCollection: (id, updates) => {
      set((state) => ({
        collections: state.collections.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      }));
    },

    toggleLike: (id) => {
      set((state) => ({
        collections: state.collections.map((item) => {
          if (item.id === id) {
            const newLiked = !item.likeSummary.liked;
            const newTotalCount = newLiked 
              ? item.likeSummary.totalCount + 1 
              : item.likeSummary.totalCount - 1;
            
            return {
              ...item,
              likeSummary: {
                ...item.likeSummary,
                liked: newLiked,
                totalCount: newTotalCount,
              },
            };
          }
          return item;
        }),
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
  })
);
