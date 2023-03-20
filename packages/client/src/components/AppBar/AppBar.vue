<script lang="ts">
import { defineComponent } from 'vue';
import store, { IStore } from '../../store';

import SignIn from './Auth/SignIn.vue';
import SignUp from './Auth/SignUp.vue';

import RequestBuilder from '../../utils/RequestBuilder';
import parseCookie from '../../utils/parseCookie';

interface AppBarState {
  store: IStore;
}

export default defineComponent({
  components: {
    SignIn,
    SignUp,
  },

  data(): AppBarState {
    return {
      store,
    };
  },

  methods: {
    async getMyInfo() {
      const response = await RequestBuilder.get({ endpoint: '/user/me' });
      store.methods.setUser(response?.data?.user);
    },

    async onSignOut() {
      await RequestBuilder.post({ endpoint: '/user/signout' });
      store.methods.setUser();
      store.methods.setChat();
    },
  },

  mounted() {
    const cookie = parseCookie(document.cookie);
    console.log(cookie);
    if (cookie?.token) {
      this.getMyInfo();
    }
  },
});
</script>

<template>
  <v-app-bar absolute color="blue-grey-lighten-4">
    <v-app-bar-title>Messenger</v-app-bar-title>

    <template v-slot:append class="mr-4">
      <div v-if="store?.user">
        <span class="ext-subtitle-1 mr-2">
          Hello, {{ store?.user?.username }}
        </span>

        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-avatar
              color="surface-variant"
              v-bind="props"
              style="cursor: pointer"
            />
          </template>
          <v-list>
            <v-list-item @click="onSignOut">Sign Out</v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div v-else>
        <sign-in />
        <sign-up />
      </div>
    </template>
  </v-app-bar>
</template>
