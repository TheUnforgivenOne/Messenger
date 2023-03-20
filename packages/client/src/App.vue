<script lang="ts">
import { defineComponent } from 'vue';
import store, { IStore } from './store';

import AppBar from './components/AppBar/AppBar.vue';
import SideBar from './components/SideBar/SideBar.vue';
import Chat from './components/Chat/Chat.vue';
import SocketManager from './utils/SocketManager';
import { WS_EVENTS } from 'monorepo-shared';

interface AppState {
  store: IStore;
}

export default defineComponent({
  components: {
    AppBar,
    SideBar,
    Chat,
  },

  data(): AppState {
    return {
      store,
    };
  },

  watch: {
    'store.user'() {
      if (!store.user || store.socketManager) {
        store.socketManager?.disconnect();
        store.methods.setSocket();
      }

      if (store.user) {
        const socketManager = new SocketManager('ws://localhost:5005/chats');

        socketManager.on(WS_EVENTS.GET_CHATS, (chats) => {
          store.methods.setChats(chats);
        });
        socketManager.on(WS_EVENTS.GET_CHAT, (chat) => {
          store.methods.setChat(chat);
        });
        socketManager.on(WS_EVENTS.CREATE_MESSAGE, (message) => {
          store.methods.addMessage(message);
        });

        socketManager.connect();
        store.methods.setSocket(socketManager);
      }
    },
  },
});
</script>

<template>
  <v-card class="w-75 mx-auto">
    <v-layout>
      <app-bar />
      <side-bar v-if="store.user" />

      <v-main class="h-screen">
        <chat v-if="store.chatId" />
      </v-main>
    </v-layout>
  </v-card>
</template>
