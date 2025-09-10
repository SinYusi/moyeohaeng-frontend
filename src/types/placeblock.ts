// Types for PlaceBlock (GET PlaceBlock API)
export interface PlaceBlock {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  detailLink: string;
  category: string;
  memo: string;
  createdAt: string;
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

// View model variables a PlaceCard component would likely consume
export interface PlaceCardVM {
  id: number;
  title: string; // name
  subtitle: string; // address
  category: string;
  memo?: string;
  detailLink?: string;
}

export interface CreatePlaceBlockRequest {
  placeId: string;
}

export function toPlaceCardVM(model: PlaceBlock): PlaceCardVM {
  return {
    id: model.id,
    title: model.name,
    subtitle: model.address,
    category: model.category,
    memo: model.memo,
    detailLink: model.detailLink,
  };
}
