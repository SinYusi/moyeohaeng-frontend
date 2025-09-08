// 지도 핀
export interface MapPin {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  detailLink: string;
  category: string;
  author: string;
}

// 장소 블록
export interface PlaceBlock {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  memo?: string;
  detailLink: string;
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

// 장소 블록 그룹
export interface PlaceBlockGroup {
  id: string;
  name: string;
  color: string;
  memo?: string;
  placeBlockIds: string[];
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
