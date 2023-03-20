import { IChat, IMessage, IUser } from './../../shared/src/interfaces';
import { reactive } from 'vue';
import SocketManager from './utils/SocketManager';

export interface IStore {
  socketManager?: SocketManager;
  user?: IUser;
  chatId?: string;
  chats: IChat[];

  methods: {
    setSocket: (ws?: SocketManager) => void;
    setUser: (user?: IUser) => void;
    setChat: (chat?: IChat) => void;
    setChats: (chats: IChat[]) => void;
    addMessage: (message: IMessage) => void;
  };
}

const store = reactive<IStore>({
  socketManager: undefined,
  user: undefined,
  chatId: undefined,
  chats: [],

  methods: {
    setSocket(ws?: SocketManager) {
      store.socketManager = ws;
    },

    setUser(user?: IUser) {
      store.user = user;
    },

    setChat(chat?: IChat) {
      store.chatId = chat?._id;
      store.chats = store.chats.map((c) => (c._id === chat?._id ? chat : c));
    },

    setChats(chats: IChat[]) {
      store.chats = chats;
    },

    addMessage(message: IMessage) {
      const chatId = message.chat;
      store.chats = store.chats.map((c) =>
        // @ts-ignore
        c._id === chatId ? { ...c, messages: [...c.messages, message] } : c
      );
    },
  },
});

export default store;
