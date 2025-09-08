import { create } from "zustand";
import type { SpotCollectionItem } from "../types/spotCollectionItem";

interface SpotCollectionState {
  collections: SpotCollectionItem[];
  addToCollection: (item: Omit<SpotCollectionItem, "id" | "addedAt">) => void;
  removeFromCollection: (id: number) => void;
  updateCollection: (id: number, updates: Partial<SpotCollectionItem>) => void;
  toggleLike: (id: number) => void;
  isInCollection: (placeId: number) => boolean;
  getCollectionByCategory: (category: string) => SpotCollectionItem[];
  getPlaceById: (placeId: number) => SpotCollectionItem | undefined;
}

export const useSpotCollectionStore = create<SpotCollectionState>()(
  (set, get) => ({
    collections: [],

    addToCollection: (item) => {
      const newItem: SpotCollectionItem = {
        ...item,
        // TODO: id, addedAt api 연결
        id: Date.now() + Math.random(),
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
            const newTotalCount = Math.max(
              0,
              item.likeSummary.totalCount + (newLiked ? 1 : -1)
            );

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

    getPlaceById: (placeId) => {
      const { collections } = get();
      return collections.find((item) => item.placeId === placeId);
    },
  })
);
