<script lang="ts">
import { defineComponent } from 'vue';
import { WS_EVENTS } from 'monorepo-shared';
import store, { IStore } from '../../../store';
import { getTitleFromUsers, getLastMessage } from './utils';

interface ChatListState {
  store: IStore;
}

export default defineComponent({
  data(): ChatListState {
    return {
      store,
    };
  },

  methods: {
    selectChat(id?: string) {
      store.socketManager?.send(WS_EVENTS.GET_CHAT, { id });
    },
  },

  computed: {
    chatList() {
      return store.chats?.map((chat) => ({
        ...chat,
        title: chat?.title ?? getTitleFromUsers(chat.users, store.user?._id),
        lastMessage: getLastMessage(chat),
      }));
    },
  },
});
</script>

<template>
  <v-list>
    <v-list-item
      v-for="chat in chatList"
      :key="chat._id"
      rounded="sm"
      class="chat-item px-2"
      @click="selectChat(chat._id)"
    >
      <template v-slot:prepend>
        <v-avatar color="surface-variant" />
      </template>

      <v-list-item-title>
        {{ chat.title }}
      </v-list-item-title>

      <v-list-item-subtitle>
        {{ chat.lastMessage }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.chat-item {
  cursor: pointer;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
}
.chat-item:hover {
  background-color: #e1f5fe;
}
</style>
