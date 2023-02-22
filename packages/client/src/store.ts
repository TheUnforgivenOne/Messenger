import { reactive } from 'vue';

const store = reactive({
  signedId: false,
  setSignedIn(token: boolean) {
    this.signedId = !!token;
  },
});

export default store;
