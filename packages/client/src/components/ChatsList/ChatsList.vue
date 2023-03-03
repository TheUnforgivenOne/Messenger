<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IChat } from 'monorepo-shared';
import store, { IStore } from '../../store';

interface ChatListState {
  store: IStore;
}

export default defineComponent({
  props: {
    chats: { type: Array as PropType<IChat[]>, required: true },
  },

  data(): ChatListState {
    return {
      store,
    };
  },

  methods: {
    selectChat(id?: string) {
      store.methods.setSelectedChat(id);
    },
  },
});
</script>

<template>
  <v-list>
    <v-list-item
      v-for="(chat, i) in chats"
      :key="i"
      rounded="sm"
      class="chat-item px-2"
      @click="selectChat(chat._id)"
    >
      <template v-slot:prepend>
        <v-avatar color="surface-variant" />
      </template>

      <v-list-item-title>
        {{ chat.title }} {{ chat.users[0].username }}
      </v-list-item-title>

      <v-list-item-subtitle> Message </v-list-item-subtitle>
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
