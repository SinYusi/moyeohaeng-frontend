// Types for PlaceBlock (GET PlaceBlock API)
export interface PlaceBlock {
  id: number;
  projectId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  memo?: string;
  detailLink?: string;
  category: string;
  color: string; // hex color e.g. #FF8A00
  author: string;
}

// View model variables a PlaceCard component would likely consume
export interface PlaceCardVM {
  id: number;
  title: string; // name
  subtitle: string; // address
  category: string;
  categoryColor: string; // color
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
    categoryColor: model.color,
    memo: model.memo,
    detailLink: model.detailLink,
  };
}
