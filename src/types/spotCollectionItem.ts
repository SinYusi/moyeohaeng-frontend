export interface SpotCollectionItem {
  id: string;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  memo: string;
  placeId: string;
  category: string;
  createAt: string;
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
