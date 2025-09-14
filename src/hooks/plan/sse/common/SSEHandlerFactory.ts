import type { SSEMessage, ActionType } from "../../../../types/sseTypes";

interface HandlerConfig {
  actionType: ActionType;
  handler: (payload: any) => void;
}

export const createSSEHandler = (
  eventType: string,
  configs: HandlerConfig[]
) => {
  return (message: SSEMessage) => {
    console.log(`[${eventType}] Received message:`, message);

    for (const config of configs) {
      if (message.actionType === config.actionType && message.payload) {
        console.log(`[${eventType}] Processing ${config.actionType} action`);
        config.handler(message.payload);
      }
    }
  };
};
