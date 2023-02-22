<script lang="ts">
import parseCookie from './utils/cookieParser';
import RequestBuilder from './utils/RequestBuilder';

export default {
  data() {
    return {
      isSignedIn: false,
    };
  },

  methods: {
    async onSignOut() {
      await RequestBuilder.post({ endpoint: '/api/user/signout' });
    },
  },

  mounted() {
    const cookie = parseCookie(document.cookie);

    this.isSignedIn = !!cookie.token;
  },
};
</script>

<template>
  <button v-if="isSignedIn" @click="onSignOut">Sign Out</button>
  <RouterView />
</template>
