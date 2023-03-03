import { IUser } from './../../shared/src/interfaces';
import { reactive } from 'vue';

export interface IStore {
  selectedChat?: string;
  user?: IUser;

  methods: any;
}

const store = reactive<IStore>({
  selectedChat: undefined,
  user: undefined,

  methods: {
    setSelectedChat(chatId?: string) {
      store.selectedChat = chatId;
    },
    setUser(newUser?: IUser) {
      store.user = newUser;
    },
  },
});

export default store;
