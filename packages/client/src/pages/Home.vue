<script lang="ts">
import { defineComponent } from 'vue';
import store from '../store';

import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';

import parseCookie from '../utils/cookieParser';
import RequestBuilder from '../utils/RequestBuilder';

export default defineComponent({
  components: {
    SignIn,
    SignUp,
  },

  data() {
    return {
      response: '',
      store,
      user: null,
    };
  },

  methods: {
    async onSignOut() {
      await RequestBuilder.post({ endpoint: '/user/signout' });
      store.methods.setToken();
    },
    async getMyInfo() {
      const response = await RequestBuilder.get({ endpoint: '/user/myinfo' });
      this.user = response.data || null;
    },
  },

  mounted() {
    const cookie = parseCookie(document.cookie);
    store.methods.setToken(cookie?.token);
    this.getMyInfo();
  },

  watch: {
    'store.token'() {
      store.token && this.getMyInfo();
    },
  },
});
</script>

<template>
  <sign-in />
  <sign-up />
  <v-sheet v-show="store.token">
    User info: {{ user }}
    <v-btn @click="onSignOut" color="brown-darken-2">Sign Out</v-btn>
  </v-sheet>
  {{ response }}
</template>
