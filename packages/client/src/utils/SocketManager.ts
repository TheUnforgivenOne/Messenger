import { WS_EVENTS } from 'monorepo-shared';

class SocketManager {
  url: string;
  socket?: WebSocket;
  handlers: { [key: string]: (data: any) => void };

  constructor(url: string) {
    this.url = url;
    this.socket = undefined;
    this.handlers = {};
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.send(WS_EVENTS.GET_CHATS);
    };

    this.socket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      const handler = this.handlers?.[type];

      handler?.(data);
    };
  }

  disconnect() {
    this.socket?.close();
  }

  send(type: WS_EVENTS, data?: any) {
    const payload = { type, data };
    this.socket?.send(JSON.stringify(payload));
  }

  on(type: WS_EVENTS, handler: (data: any) => void) {
    this.handlers[type] = handler;
  }

  off(type: WS_EVENTS) {
    delete this.handlers[type];
  }
}

export default SocketManager;
