import { reactive } from 'vue';

interface IUserStore {
  username: string;
  token: string;
}

const defaultUser: IUserStore = {
  username: '',
  token: '',
};

const store = reactive({
  user: defaultUser,
  setUser(user: IUserStore) {
    this.user = user;
  },
  resetUser() {
    this.user = defaultUser;
  },
});

export default store;
