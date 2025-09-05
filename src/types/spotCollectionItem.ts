// 기본 장소 정보 (상단 카드 부분)
export interface PlaceInfo {
  id: string;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId: string;
  category: string;
  detailLink?: string;
}

// 사용자 상호작용 정보 (하단 코멘트/좋아요 부분)
export interface UserInteraction {
  memo: string;
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
