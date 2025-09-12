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

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
export type ActionType =
  | "CREATED"
  | "UPDATE"
  | "DELETE"
  | "MEMO_UPDATE"
  | "LIKE_UPDATE";

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
  actionType: "LikeUpdate";
  payload: LikeUpdatePayload;
}
