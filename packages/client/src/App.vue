<script lang="ts">
import { defineComponent } from 'vue';
import store, { IStore } from './store';

import AppBar from './components/AppBar/AppBar.vue';
import SideBar from './components/SideBar/SideBar.vue';
import Chat from './components/Chat/Chat.vue';

export default defineComponent({
  components: {
    AppBar,
    SideBar,
    Chat,
  },

  data() {
    return {
      store,
    };
  },
});
</script>

<template>
  <v-card class="w-75 mx-auto">
    <v-layout>
      <app-bar />
      <side-bar v-if="store.user" />

      <v-main class="h-screen">
        <chat v-if="store.selectedChat" :chat-id="store.selectedChat" />
      </v-main>
    </v-layout>
  </v-card>
</template>
