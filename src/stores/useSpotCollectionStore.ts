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
  updateLikedMembers: (
    placeBlockId: string,
    author: string,
    liked: boolean
  ) => void;
  toggleLike: (id: string) => void;
  updateCommentSummary: (
    placeBlockId: string,
    commentContent: string,
    authorName: string
  ) => void;
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
        collections: [...state.collections, item]
      }));
    },

    fetchCollections: (placeBlocks: PlaceBlock[]) => {
      set({ collections: placeBlocks });
    },

    removeFromCollection: (id) => {
      set((state) => ({
        collections: state.collections.filter(
          (item) => item.id !== id.toString()
        )
      }));
    },

    updateCollection: (id, updates) => {
      set((state) => ({
        collections: state.collections.map((item) => {
          if (item.id === id) {
            // updates가 PlaceBlock 전체인 경우 그대로 교체
            if (
              "place" in updates &&
              "likeSummary" in updates &&
              "commentSummary" in updates
            ) {
              return updates as PlaceBlock;
            }
            // 부분 업데이트인 경우 기존 데이터와 병합
            return { ...item, ...updates };
          }
          return item;
        }),
      }));
    },

    updateLikedMembers: (
      placeBlockId: string,
      author: string,
      liked: boolean
    ) => {
      set((state) => {
        // 현재 상태 확인
        const targetBlock = state.collections.find(item => item.id.toString() === placeBlockId);
        if (!targetBlock) return state;

        // 새로운 상태 생성
        const updatedCollections = state.collections.map((item) => {
          if (item.id.toString() === placeBlockId) {
            const likedMembers = [...item.likeSummary.likedMembers];
            const memberIndex = likedMembers.indexOf(author);

            // 좋아요 상태 업데이트
            if (liked && memberIndex === -1) {
              likedMembers.push(author);
            } else if (!liked && memberIndex !== -1) {
              likedMembers.splice(memberIndex, 1);
            }

            return {
              ...item,
              likeSummary: {
                ...item.likeSummary,
                liked,
                likedMembers,
                totalCount: likedMembers.length,
              },
            };
          }
          return item;
        });

        // 변경된 상태 반환
        return { collections: updatedCollections };
      });
    },

    toggleLike: (id) => {
      set((state) => ({
        collections: state.collections.map((item) => {
          if (item.id === id) {
            const newLiked = !item.likeSummary.liked;
            const likedMembers = [...item.likeSummary.likedMembers];
            if (newLiked) {
              likedMembers.push("current-user"); // TODO: 실제 사용자 ID로 대체 필요
            } else {
              const index = likedMembers.indexOf("current-user");
              if (index > -1) {
                likedMembers.splice(index, 1);
              }
            }

            return {
              ...item,
              likeSummary: {
                ...item.likeSummary,
                liked: newLiked,
                likedMembers,
                totalCount: likedMembers.length,
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
