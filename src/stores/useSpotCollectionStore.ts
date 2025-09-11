import { create } from "zustand";
import type { PlaceBlock, Place } from "../types/planTypes";

export interface ClickedPlace {
  position: { lat: number; lng: number };
  kakaoPlace: kakao.maps.services.PlacesSearchResultItem;
  place?: Place;
  distance: number;
}

interface SpotCollectionState {
  collections: PlaceBlock[];
  clickedPlace: ClickedPlace | null;
  addToCollection: (item: PlaceBlock) => void;
  fetchCollections: (placeBlocks: PlaceBlock[]) => void;
  removeFromCollection: (id: string) => void;
  removeFromCollectionByPlaceId: (placeId: string) => void;
  updateCollection: (id: string, updates: Partial<PlaceBlock>) => void;
  toggleLike: (id: string) => void;
  updateCommentSummary: (placeBlockId: string, commentContent: string, authorName: string) => void;
  setClickedPlace: (place: ClickedPlace | null) => void;
  isInCollection: (placeId: string) => boolean;
  getCollectionByCategory: (category: string) => PlaceBlock[];
  getPlaceById: (placeId: string) => PlaceBlock | undefined;
  getCollectionByPlaceId: (placeId: string) => PlaceBlock | undefined;
}

export const useSpotCollectionStore = create<SpotCollectionState>()(
  (set, get) => ({
    collections: [],
    clickedPlace: null,

    addToCollection: (item) => {
      set((state) => ({
        collections: [...state.collections, item],
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

    updateCommentSummary: (placeBlockId, commentContent, authorName) => {
      set((state) => ({
        collections: state.collections.map((item) => {
          if (item.id === placeBlockId) {
            return {
              ...item,
              commentSummary: {
                totalCount: item.commentSummary.totalCount + 1,
                lastComment: {
                  content: commentContent,
                  author: authorName,
                },
              },
            };
          }
          return item;
        }),
      }));
    },

    setClickedPlace: (place) => {
      set({ clickedPlace: place });
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

    removeFromCollectionByPlaceId: (placeId) => {
      set((state) => ({
        collections: state.collections.filter(
          (item) => item.detailLink.split("/").pop() !== placeId
        ),
      }));
    },

    getCollectionByPlaceId: (placeId) => {
      const { collections } = get();
      return collections.find(
        (item) => item.detailLink.split("/").pop() === placeId
      );
    },
  })
);
