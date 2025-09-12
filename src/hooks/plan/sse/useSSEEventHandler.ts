import type { SSEEventData } from "../../../types/sseTypes";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import { createEventHandlers } from "./eventHandlers";

// SSE 이벤트 핸들러 훅
export const useSSEEventHandler = (refetch: () => void) => {
  // 좋아요 상태 업데이트 함수
  const updateLikedMembers = useSpotCollectionStore(
    (state) => state.updateLikedMembers
  );

  const eventHandlers = createEventHandlers(refetch, updateLikedMembers);

  // SSE 이벤트 처리 함수
  const handleSSEEvent = (eventData: SSEEventData) => {
    const { message, eventType } = eventData;
    if (!message || !eventType) return;

    console.log(`handleSSEEvent [SSE] Processing ${eventType} event:`, message);

    const handler = eventHandlers[eventType];
    if (handler) {
      handler(message);
    } else {
      console.log(`[SSE] Unhandled event type: ${eventType}`);
    }
  };

  return handleSSEEvent;
};
