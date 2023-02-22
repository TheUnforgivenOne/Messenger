<script lang="ts">
import parseCookie from './utils/cookieParser';
import RequestBuilder from './utils/RequestBuilder';
import store from './store';

export default {
  data() {
    return {
      store,
    };
  },

  methods: {
    async onSignOut() {
      await RequestBuilder.post({ endpoint: '/api/user/signout' });
      store.setSignedIn(false);
    },
  },

  mounted() {
    const cookie = parseCookie(document.cookie);
    store.setSignedIn(!!cookie?.token);
  },
};
</script>

<template>
  <button v-if="store.signedId" @click="onSignOut">Sign Out</button>
  <RouterView />
</template>
