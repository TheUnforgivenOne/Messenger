import { IUser } from './../../shared/src/interfaces';
import { IncomingMessage, Server } from 'http';
import WebSocket from 'ws';
import validateToken from './utils/validatetoken';
import MessageRepository from './DataAccessLayer/repositories/MessageRepository';
import ChatRepository from './DataAccessLayer/repositories/ChatRepository';

interface IRequest extends IncomingMessage {
  userId?: string;
}

const websockets = async (expressServer: Server) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: '/ws',
  });

  expressServer.on('upgrade', async (req: IRequest, socket, head) => {
    const { userId } = await validateToken(req.headers.cookie?.split('=')[1]);

    req.userId = userId;
    websocketServer.handleUpgrade(req, socket, head, (websocket) => {
      websocketServer.emit('connection', websocket, req);
    });
  });

  websocketServer.on('connection', (connection, req: IRequest) => {
    connection.on('message', async (message: string) => {
      const parsedMessage = await JSON.parse(message);

      const params = {
        chatId: parsedMessage.chatId,
        from: parsedMessage.from,
      };
      const response = await MessageRepository.getMessages(params);
      // const newMessage = await MessageRepository.createMessage({
      //   user: req.userId!,
      //   message: parsedMessage.message,
      //   chat: parsedMessage.chat,
      // });

      connection.send(JSON.stringify(response));
    });
  });

  return websocketServer;
};

export default websockets;
