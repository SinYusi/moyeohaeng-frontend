// 지도 핀
export interface Place {
  id: string; // serverPlaceId
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  detailLink: string;
  category: string;
  author: string;
}

export interface MapPin {
  author: string;
  id: string; // serverId
  place: Place;
}

// 지도 핀 생성 API 요청용
export type CreateMapPinRequest = Omit<Place, "id">;

export type PostPlaceBlockResponse = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  detailLink: string;
  category: string;
  memo?: string;
  createAt: string;
};

// 장소 블록
export type PlaceBlock = PostPlaceBlockResponse & {
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
};

export interface Comment {
  content: string;
  createdAt: string;
  id: string;
  modifiedAt: string;
  name: string;
  placeBlockId: string;
  profileImage: string | null;
}

// 장소 블록 그룹
export interface PlaceBlockGroup {
  id: string;
  name: string;
  color: string;
  memo?: string;
  placeBlockIds: string[];
}

export interface Group {
  id: string;
  name: string;
  color: string;
  memo: string;
  placeBlockIds: number[];
}

// 여행 일정 시간 블록
export interface ScheduleTimeBlock {
  id: string;
  day: number;
  startTime: string;
  endTime: string;
  memo?: string;
  placeDetail: {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    detailLink: string;
    category: string;
  };
}
