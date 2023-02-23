<script lang="ts">
import store from '../store';

import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';

import parseCookie from '../utils/cookieParser';
import RequestBuilder from '../utils/RequestBuilder';

export default {
  components: {
    SignIn,
    SignUp,
  },
  data() {
    return {
      response: '',
      store,
    };
  },

  methods: {
    async fetchData() {
      const response = await RequestBuilder.get({ endpoint: '/api' });
      this.response = response;
    },
    async onSignOut() {
      await RequestBuilder.post({ endpoint: '/api/user/signout' });
      store.resetUser();
    },
  },

  mounted() {
    const cookie = parseCookie(document.cookie);
    store.setUser({ username: cookie?.username, token: cookie?.token });
    this.fetchData();
  },

  watch: {
    'store.user'() {
      this.fetchData();
    },
  },
};
</script>

<template>
  <h1>Home</h1>
  <sign-in />
  <sign-up />
  <v-sheet v-if="store.user.token">
    Hello, {{ store.user.username }}
    <v-btn @click="onSignOut">Sign Out</v-btn>
  </v-sheet>
  {{ response }}
</template>
