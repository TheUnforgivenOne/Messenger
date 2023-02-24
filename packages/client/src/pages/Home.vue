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
    async fetchData() {
      const response = await RequestBuilder.get({ endpoint: '/api' });
      this.response = response;
    },
    async onSignOut() {
      await RequestBuilder.post({ endpoint: '/api/user/signout' });
      store.methods.setToken();
    },
    async getMyInfo() {
      const response = await RequestBuilder.get({ endpoint: '/api/user' });
      this.user = response.data || null;
    }
  },

  mounted() {
    const cookie = parseCookie(document.cookie);
    store.methods.setToken(cookie?.token);
    this.fetchData();
  },

  watch: {
    'store.token'() {
      this.fetchData();
      store.token && this.getMyInfo();
    },
  },
});
</script>

<template>
  <h1>Home</h1>
  <sign-in />
  <sign-up />
  <v-sheet v-show="store.token">
    Hello, {{ user }}
    <v-btn @click="onSignOut" color="brown-darken-2">Sign Out</v-btn>
  </v-sheet>
  {{ response }}
</template>
