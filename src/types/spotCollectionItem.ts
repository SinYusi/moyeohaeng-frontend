export interface PlaceInfo {
  id: number;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId: number;
  category: string;
  detailLink?: string;
  memo: string;
}

export interface UserInteraction {
  likeSummary: {
    totalCount: number;
    liked: boolean;
    likedMembers: string[];
  };
  commentSummary: {
    totalCount: number;
    lastComment: {
      content: string;
      author: string;
    };
  };
}

// 전체 아이템 (기존과 동일하지만 구조화됨)
export interface SpotCollectionItem extends PlaceInfo, UserInteraction {
  createAt: string;
}
