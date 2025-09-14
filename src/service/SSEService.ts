import { fetchEventSource } from "@microsoft/fetch-event-source";
import type { SSEConfig, SSEMessage, SSEOptions } from "../types/sseTypes";
import useAuthStore from "../stores/useAuthStore";

export class SSEService {
  private static instance: SSEService;
  private connections: Map<string, AbortController>;
  private config: SSEConfig = {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080",
  };
  private listeners: Map<string, Set<(data: any) => void>>;

  private activeConnection: AbortController | null = null;

  private constructor() {
    this.connections = new Map();
    this.listeners = new Map();
  }

  private closeConnection(controller: AbortController) {
    console.log("[SSE] Closing connection");
    controller.abort();
    if (this.activeConnection === controller) {
      this.activeConnection = null;
    }
  }

  private closeAllConnections() {
    console.log("[SSE] Closing all connections");
    this.connections.forEach((controller, type) => {
      console.log(`[SSE] Closing connection for type: ${type}`);
      this.closeConnection(controller);
    });
    this.connections.clear();
    this.listeners.clear();
  }

  public static getInstance(): SSEService {
    if (!SSEService.instance) {
      SSEService.instance = new SSEService();
    }
    return SSEService.instance;
  }

  public setProjectId(projectId: string) {
    if (this.config.projectId !== projectId) {
      this.closeAllConnections();
      this.config.projectId = projectId;
    }
  }

  public subscribe<T>(
    type: string,
    callback: (data: T) => void,
    options: SSEOptions = {}
  ): () => void {
    if (!this.config.projectId) {
      console.error("[SSE] Cannot subscribe without project ID");
      return () => {};
    }

    let listeners = this.listeners.get(type);
    if (!listeners) {
      listeners = new Set();
      this.listeners.set(type, listeners);
      this.connect(type, options);
    }

    // 이미 동일한 콜백이 있는지 확인
    if (listeners.has(callback)) {
      console.log(`[SSE] Callback already exists for ${type}`);
      return () => {
        listeners?.delete(callback);
      };
    }

    console.log(`[SSE] Adding listener for ${type}`, {
      projectId: this.config.projectId,
      timestamp: new Date().toISOString(),
      listenerCount: this.listeners.get(type)?.size || 0,
    });

    this.listeners.get(type)?.add(callback);

    // 구독 해제 함수 반환
    return () => {
      const listeners = this.listeners.get(type);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.disconnect(type);
          this.listeners.delete(type);
        }
      }
    };
  }

  private async connect(type: string, options: SSEOptions) {
    try {
      const url = this.buildUrl();
      console.log("[SSE] Attempting to connect to:", url);

      // 기존 동일 타입의 연결이 있는 경우 제거
      const existingController = this.connections.get(type);
      if (existingController) {
        console.log(`[SSE] Closing existing connection for type: ${type}`);
        this.closeConnection(existingController);
        this.connections.delete(type);
      }

      const controller = new AbortController();
      this.activeConnection = controller;
      this.connections.set(type, controller);

      const {
        retryOnError = true,
        retryInterval = 5000,
        ...fetchOptions
      } = options;

      await fetchEventSource(url, {
        ...fetchOptions,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
          Accept: "text/event-stream",
        },
        signal: controller.signal,
        onopen: async (response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to connect to SSE stream: ${response.status} ${response.statusText}`
            );
          }
          console.log("[SSE] Connection opened successfully");
        },
        onmessage: (event: { data: string; id?: string }) => {
          try {
            if (event.data === "hello") {
              console.log("[SSE] Connection established successfully");
              return;
            }
            if (!event.data.trim()) {
              return;
            }

            const eventData = JSON.parse(event.data) as SSEMessage;
            const [eventType] = (event.id || "").split(":");

            const messageData = {
              fullId: event.id,
              eventType,
              message: eventData,
            };

            console.log("[SSE] Received message:", messageData);

            // 리스너들에게 이벤트 전달
            const listeners = this.listeners.get(eventType);
            if (listeners) {
              console.log(
                `[SSE] Found ${listeners.size} listeners for ${eventType}`
              );
              listeners.forEach((callback) => {
                try {
                  callback(messageData);
                } catch (error) {
                  console.error(`[SSE] Error in ${eventType} listener:`, error);
                }
              });
            }
          } catch (error) {
            console.error("Failed to parse SSE message:", error);
            console.log("Raw data that caused error:", event.data);
          }
        },
        onerror: (error) => {
          console.error(`SSE Error for ${type}:`, error);
          if (retryOnError) {
            setTimeout(() => {
              this.connect(type, options);
            }, retryInterval);
          }
          throw error;
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.log("SSE connection aborted");
        } else {
          console.error(`SSE Connection Error for ${type}:`, error);
          console.error("Error details:", error.message);
        }
      }
    }
  }

  private disconnect(type: string) {
    const controller = this.connections.get(type);
    if (controller) {
      controller.abort();
      this.connections.delete(type);
    }
  }

  private buildUrl(): string {
    if (!this.config.projectId) {
      throw new Error("Project ID is required for SSE connection");
    }

    const url = `${this.config.baseUrl}/v1/projects/${this.config.projectId}/connect`;
    return url;
  }

  public disconnectAll() {
    this.connections.forEach((controller) => controller.abort());
    this.connections.clear();
    this.listeners.clear();
  }
}
