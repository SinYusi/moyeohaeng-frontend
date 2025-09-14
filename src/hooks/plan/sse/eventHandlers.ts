import type { SSEMessage } from "../../../types/sseTypes";
import { ACTION_TYPES, EVENT_TYPES } from "../../../types/sseTypes";
import { createSSEHandler } from "./common/SSEHandlerFactory";

type EventHandler = (message: SSEMessage) => void;

export const createEventHandlers = (
  refetch: () => void,
  updateLikedMembers: (blockId: string, author: string, liked: boolean) => void
) => {
  const handlers: Record<string, EventHandler> = {
    [EVENT_TYPES.PIN]: createSSEHandler(EVENT_TYPES.PIN, [
      {
        actionType: ACTION_TYPES.UPDATED,
        handler: () => {
          // 프로젝트 업데이트 처리
        },
      },
    ]),

    [EVENT_TYPES.PLACE_BLOCK_LIKE]: createSSEHandler(
      EVENT_TYPES.PLACE_BLOCK_LIKE,
      [
        {
          actionType: ACTION_TYPES.LIKE_UPDATED,
          handler: ({ placeBlockId, author, liked }) => {
            updateLikedMembers(placeBlockId.toString(), author, liked);
          },
        },
      ]
    ),

    [EVENT_TYPES.PLACE_BLOCK_COMMENT]: createSSEHandler(
      EVENT_TYPES.PLACE_BLOCK_COMMENT,
      [
        {
          actionType: ACTION_TYPES.CREATED,
          handler: ({ id }) => {
            if (id) {
              console.log("[PLACE_BLOCK_COMMENT] Comment created:", id);
              refetch();
            }
          },
        },
        {
          actionType: ACTION_TYPES.DELETED,
          handler: ({ id }) => {
            if (id) {
              console.log("[PLACE_BLOCK_COMMENT] Comment deleted:", id);
              refetch();
            }
          },
        },
      ]
    ),

    [EVENT_TYPES.PLACE_BLOCK]: createSSEHandler(EVENT_TYPES.PLACE_BLOCK, [
      {
        actionType: ACTION_TYPES.CREATED,
        handler: ({ id }) => {
          if (id) refetch();
        },
      },
      {
        actionType: ACTION_TYPES.DELETED,
        handler: ({ id }) => {
          if (id) {
            console.log("[PLACE_BLOCK] Block deleted:", id);
            refetch();
          }
        },
      },
    ]),

    [EVENT_TYPES.PLACE_GROUP]: createSSEHandler(EVENT_TYPES.PLACE_GROUP, [
      {
        actionType: ACTION_TYPES.UPDATED,
        handler: () => {
          // TODO 그룹 업데이트 처리
        },
      },
    ]),
  };

  return handlers;
};
