import { create } from "zustand";
import type { PlaceBlock } from "../types/planTypes";

interface SpotCollectionState {
  collections: PlaceBlock[];
  addToCollection: (item: Omit<PlaceBlock, "id" | "createdAt">) => void;
  fetchCollections: (placeBlocks: PlaceBlock[]) => void;
  removeFromCollection: (id: string) => void;
  updateCollection: (id: string, updates: Partial<PlaceBlock>) => void;
  toggleLike: (id: string) => void;
  isInCollection: (placeId: string) => boolean;
  getCollectionByCategory: (category: string) => PlaceBlock[];
  getPlaceById: (placeId: string) => PlaceBlock | undefined;
}

export const useSpotCollectionStore = create<SpotCollectionState>()(
  (set, get) => ({
    collections: [],

    addToCollection: (item) => {
      const newItem: PlaceBlock = {
        ...item,
        // TODO: id, addedAt api 연결
        id: Date.now() + Math.random().toString(),
      };

      set((state) => ({
        collections: [...state.collections, newItem],
      }));
    },

    fetchCollections: (placeBlocks: PlaceBlock[]) => {
      set(() => ({
        collections: [...placeBlocks],
      }));
    },

    removeFromCollection: (id) => {
      set((state) => ({
        collections: state.collections.filter(
          (item) => item.id !== id.toString()
        ),
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
      return collections.some((item) => {
        return item.detailLink.split("/").pop() === placeId;
      });
    },

    getCollectionByCategory: (category) => {
      const { collections } = get();
      return collections.filter((item) => item.category === category);
    },

    getPlaceById: (id) => {
      const { collections } = get();
      return collections.find((item) => item.id.toString() === id);
    },
  })
);
