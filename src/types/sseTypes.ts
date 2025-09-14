export const EVENT_TYPES = {
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT",
  PRESENCE: "PRESENCE",
  SCRAP_BOOK: "SCRAP_BOOK",
  TIME_BLOCK: "TIME_BLOCK",
  PROJECT: "PROJECT",
  PLACE_GROUP: "PLACE_GROUP",
  PLACE_BLOCK_LIKE: "PLACE_BLOCK_LIKE",
  PLACE_BLOCK_COMMENT: "PLACE_BLOCK_COMMENT",
  PLACE_BLOCK: "PLACE_BLOCK",
  PIN: "PIN",
} as const;

export const ACTION_TYPES = {
  CREATED: "CREATED",
  UPDATED: "UPDATED",
  DELETED: "DELETED",
  MEMO_UPDATED: "MEMO_UPDATED",
  LIKE_UPDATED: "LIKE_UPDATED",
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
export type ActionType = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];

// SSE 이벤트 데이터 인터페이스
export interface SSEEventData {
  eventType: EventType; // 이벤트 타입
  message: SSEMessage; // 이벤트 메시지
  fullId: string; // 이벤트 고유 ID
  timestamp: string; // 이벤트 발생 시간
}

export interface SSEMessage<T = any> {
  actionType: ActionType;
  payload: T;
  timestamp: string;
}

export interface SSEConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  projectId?: string;
}

export interface SSEOptions extends RequestInit {
  retryOnError?: boolean;
  retryInterval?: number;
}

export interface LikeUpdatePayload {
  placeBlockId: number;
  author: string;
  liked: boolean;
}

export interface LikeUpdateMessage {
  actionType: typeof ACTION_TYPES.LIKE_UPDATED;
  payload: LikeUpdatePayload;
}
