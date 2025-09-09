type EventCallback = () => void;

class EventManager {
  private listeners: { [key: string]: EventCallback[] } = {};

  subscribe(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback
      );
    };
  }

  emit(event: string) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => {
        setTimeout(callback, 0);
      });
    }
  }
}

export const eventManager = new EventManager();

// Auth events
export const AUTH_EVENTS = {
  LOGIN_SUCCESS: "auth:login_success",
} as const;
