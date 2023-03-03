import { reactive } from 'vue';

export interface IStore {
  token?: string;
  selectedChat?: string;
  methods: any;
}

const store = reactive<IStore>({
  token: undefined,
  selectedChat: undefined,

  methods: {
    setToken(newToken?: string) {
      store.token = newToken;
    },
    setSelectedChat(chatId?: string) {
      store.selectedChat = chatId;
    },
  },
});

export default store;
