import { reactive } from 'vue';

export interface IStore {
  token?: string;
  methods: any;
}

const store = reactive<IStore>({
  token: undefined,

  methods: {
    setToken(newToken?: string) {
      store.token = newToken;
    },
  },
});

export default store;
