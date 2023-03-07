import { IUser } from 'monorepo-shared';
import { IncomingMessage, Server } from 'http';
import WebSocket from 'ws';
import validateToken from './utils/validatetoken';
import MessageRepository from './DataAccessLayer/repositories/MessageRepository';
import ChatRepository from './DataAccessLayer/repositories/ChatRepository';

interface IRequest extends IncomingMessage {
  user?: IUser;
  chatId?: string;
}

interface IWS extends WebSocket.WebSocket {
  chatId?: string;
}

const parseQuery = (url?: string): { [key: string]: string } => {
  if (!url) return {};
  const query = url.split('?')[1];
  const params = query.split('&');

  return params.reduce((acc, param) => {
    const [key, value] = param.split('=');
    Object.assign(acc, { [key]: value });
    return acc;
  }, {});
};

const websockets = async (expressServer: Server) => {
  const chatWss = new WebSocket.Server<IWS>({
    noServer: true,
    path: '/chat',
  });

  expressServer.on('upgrade', async (req: IRequest, socket, head) => {
    const query = parseQuery(req?.url);
    const token = req.headers.cookie?.split('=')[1];
    const { user } = await validateToken(token);

    if (!user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    req.user = user;
    req.chatId = query?.chatId;
    chatWss.handleUpgrade(req, socket, head, (websocket) => {
      chatWss.emit('connection', websocket, req);
    });
  });

  chatWss.on('connection', (connection: IWS, req: IRequest) => {
    connection.chatId = req.chatId;
    connection.on('error', console.error);

    connection.on('message', async (message: string) => {
      const parsedMessage = await JSON.parse(message);

      if (!parsedMessage) return;

      const { type, data } = parsedMessage;

      if (type == 'GET_CHAT') {
        const chat = await ChatRepository.getChat(data.chatId);

        connection.send(JSON.stringify({ type, data: chat }));
      }

      if (type == 'NEW_MESSAGE') {
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
            client.chatId === data.chatId
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
