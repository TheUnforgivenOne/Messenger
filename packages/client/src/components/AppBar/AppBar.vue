<script lang="ts">
import { defineComponent } from 'vue';
import { IUser } from 'monorepo-shared';
import store, { IStore } from '../../store';

import SignIn from './Auth/SignIn.vue';
import SignUp from './Auth/SignUp.vue';

import RequestBuilder from '../../utils/RequestBuilder';
import parseCookie from '../../utils/parseCookie';

interface AppBarState {
  store: IStore;
  user: IUser | null;
}

export default defineComponent({
  components: {
    SignIn,
    SignUp,
  },

  data(): AppBarState {
    return {
      store,
      user: null,
    };
  },

  methods: {
    async getMyInfo() {
      const response = await RequestBuilder.get({ endpoint: '/user' });
      this.user = response.data.users[0] || null;
    },

    async onSignOut() {
      await RequestBuilder.post({ endpoint: '/user/signout' });
      store.methods.setToken();
      this.user = null;
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
  <v-app-bar absolute color="blue-grey-lighten-4">
    <v-app-bar-title>Messenger</v-app-bar-title>

    <template v-slot:append class="mr-4">
      <div v-show="user">
        <span class="ext-subtitle-1 mr-2">Hello, {{ user?.username }}</span>

        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-avatar color="surface-variant" v-bind="props" style="cursor: pointer;" />
          </template>
          <v-list>
            <v-list-item @click="onSignOut">Sign Out</v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div v-show="!store.token">
        <sign-in />
        <sign-up />
      </div>
    </template>
  </v-app-bar>
</template>
