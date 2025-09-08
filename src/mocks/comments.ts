// 댓글 모의 데이터: placeId 별로 2~4개씩 구성
export type CommentMock = {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  userColor: "red" | "yellow";
  isOwn: boolean;
};

export const commentsByPlace: Record<number, CommentMock[]> = {
  101: [
    {
      id: "101-1",
      author: "민수",
      content: "일출 보려면 새벽 5시에 출발 필요",
      timestamp: "10분 전",
      userColor: "red",
      isOwn: false,
    },
    {
      id: "101-2",
      author: "8비트",
      content: "주차 넉넉, 등산화 추천",
      timestamp: "방금 전",
      userColor: "yellow",
      isOwn: true,
    },
    {
      id: "101-3",
      author: "유나",
      content: "정상에서 바람 많이 붐",
      timestamp: "1시간 전",
      userColor: "red",
      isOwn: false,
    },
  ],
  102: [
    {
      id: "102-1",
      author: "하나",
      content: "노을 타임에 사람 많음, 돗자리 챙겨요",
      timestamp: "어제",
      userColor: "yellow",
      isOwn: false,
    },
    {
      id: "102-2",
      author: "졸리지연",
      content: "물놀이 뒤 샤워실 이용 가능",
      timestamp: "3분 전",
      userColor: "red",
      isOwn: false,
    },
  ],
  103: [
    {
      id: "103-1",
      author: "소희",
      content: "녹차 아이스크림 무조건!",
      timestamp: "2시간 전",
      userColor: "yellow",
      isOwn: false,
    },
    {
      id: "103-2",
      author: "8비트",
      content: "기념품샵 7시까지",
      timestamp: "방금 전",
      userColor: "yellow",
      isOwn: true,
    },
    {
      id: "103-3",
      author: "알렉스",
      content: "주차장 입구 헷갈림",
      timestamp: "어제",
      userColor: "red",
      isOwn: false,
    },
    {
      id: "103-4",
      author: "민수",
      content: "혼잡 시간 12~2시 피하기",
      timestamp: "3일 전",
      userColor: "red",
      isOwn: false,
    },
  ],
  104: [
    {
      id: "104-1",
      author: "유나",
      content: "야시장 붕어빵 줄 김",
      timestamp: "30분 전",
      userColor: "yellow",
      isOwn: false,
    },
    {
      id: "104-2",
      author: "8비트",
      content: "현금가게 약간 있음",
      timestamp: "방금 전",
      userColor: "yellow",
      isOwn: true,
    },
  ],
};
