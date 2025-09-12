import type { SSEMessage } from "../../types/sseTypes";
import { ACTION_TYPES, EVENT_TYPES } from "../../types/sseTypes";

type EventHandler = (message: SSEMessage) => void;

// 이벤트 타입별 핸들러 생성 함수
export const createEventHandlers = (
  refetch: () => void,
  updateLikedMembers: (blockId: string, author: string, liked: boolean) => void
) => {
  // 이벤트 타입과 핸들러 함수 매핑 객체
  const handlers: Record<string, EventHandler> = {
    [EVENT_TYPES.PIN]: (message) => {
      if (message.actionType === ACTION_TYPES.UPDATED && message.payload) {
        // 프로젝트 업데이트 처리
      }
    },

    [EVENT_TYPES.PLACE_BLOCK_LIKE]: (message) => {
      console.log('[PLACE_BLOCK_LIKE] Received message:', message);
      if (message.actionType === ACTION_TYPES.LIKE_UPDATED && message.payload) {
        const { placeBlockId, author, liked } = message.payload;
        console.log('[PLACE_BLOCK_LIKE] Updating like status:', { placeBlockId, author, liked });
        updateLikedMembers(placeBlockId.toString(), author, liked);
      } else {
        console.log('[PLACE_BLOCK_LIKE] Invalid message format or action type');
      }
    },

    [EVENT_TYPES.PLACE_BLOCK_COMMENT]: (message) => {
      if (message.actionType === ACTION_TYPES.CREATED && message.payload) {
        const id = message.payload.id;
        if (id) {
          console.log(
            "[case PLACE_BLOCK_COMMENT] Place block comment created:",
            id
          );
          refetch();
        }
      }

      if (message.actionType === ACTION_TYPES.DELETED && message.payload) {
        const id = message.payload.id;
        if (id) {
          console.log(
            "[case PLACE_BLOCK_COMMENT] Place block comment deleted:",
            id
          );
          refetch();
        }
      }
    },

    [EVENT_TYPES.PLACE_BLOCK]: (message) => {
      console.log("[case PLACE_BLOCK] PLACE_BLOCK event");
      console.log("[case PLACE_BLOCK] PLACE_BLOCK message", message);

      if (message.actionType === ACTION_TYPES.CREATED && message.payload) {
        const id = message.payload.id;
        if (id) {
          refetch();
        }
      }
      if (message.actionType === ACTION_TYPES.DELETED && message.payload) {
        const id = message.payload.id;
        if (id) {
          console.log("[case PLACE_BLOCK] Place block deleted:", id);
          refetch();
        }
      }
    },

    [EVENT_TYPES.PLACE_GROUP]: (message) => {
      if (message.actionType === ACTION_TYPES.UPDATED && message.payload) {
        // TODO 그룹 업데이트 처리
      }
    },
  };

  return handlers;
};
