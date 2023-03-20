import { IUser, WS_EVENTS } from 'monorepo-shared';
import { IncomingMessage, Server } from 'http';
import WebSocket from 'ws';
import validateToken from './utils/validatetoken';
import MessageRepository from './DataAccessLayer/repositories/MessageRepository';
import ChatRepository from './DataAccessLayer/repositories/ChatRepository';

interface IRequest extends IncomingMessage {
  user: IUser;
}

interface IWS extends WebSocket.WebSocket {
  userChatsIds?: string[];
}

const websockets = async (expressServer: Server) => {
  const chatWss = new WebSocket.Server<IWS>({
    noServer: true,
    path: '/chats',
  });

  expressServer.on('upgrade', async (req: IRequest, socket, head) => {
    const token = req.headers.cookie?.split('=')[1];
    const { user } = await validateToken(token);

    if (!user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    req.user = user;
    chatWss.handleUpgrade(req, socket, head, (websocket) => {
      chatWss.emit('connection', websocket, req);
    });
  });

  chatWss.on('connection', (connection: IWS, req: IRequest) => {
    connection.on('error', console.error);

    connection.on('message', async (message: string) => {
      const parsedMessage = JSON.parse(message);

      if (!parsedMessage) return;

      const { type, data } = parsedMessage;

      if (type === WS_EVENTS.GET_CHATS) {
        const userChats = await ChatRepository.getChatsByUser(req.user._id);
        // Save ids of user chats for future breadcasting
        connection.userChatsIds = userChats.map((chat) => chat._id.toString());

        connection.send(JSON.stringify({ type, data: userChats }));
      }

      if (type === WS_EVENTS.GET_CHAT) {
        const chat = await ChatRepository.getChat(data.id);

        connection.send(JSON.stringify({ type, data: chat }));
      }

      if (type === WS_EVENTS.CREATE_MESSAGE) {
        const newMessage = await MessageRepository.createMessage({
          user: req.user?._id!,
          message: data.message,
          chat: data.chatId,
        });

        let message = newMessage;
        message.user = req.user!;

        chatWss.clients.forEach((client) => {
          if (
            client.readyState === WebSocket.OPEN &&
            client.userChatsIds?.includes(data.chatId)
          ) {
            client.send(
              JSON.stringify({
                type,
                data: message,
              })
            );
          }
        });
      }
    });
  });

  return chatWss;
};

export default websockets;
