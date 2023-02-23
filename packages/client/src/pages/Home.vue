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
      store.setSignedIn(false);
    },
  },

  mounted() {
    const cookie = parseCookie(document.cookie);
    store.setSignedIn(!!cookie?.token);
    this.fetchData();
  },

  watch: {
    'store.signedId'() {
      this.fetchData();
    },
  },
};
</script>

<template>
  <h1>Home</h1>
  <sign-in />
  <sign-up />
  <button v-if="store.signedId" @click="onSignOut">Sign Out</button>
  {{ response }}
</template>
