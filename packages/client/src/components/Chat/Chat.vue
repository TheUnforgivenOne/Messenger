<script lang="ts">
import { IChat, WS_EVENTS } from 'monorepo-shared';
import store, { IStore } from '../../store';
import { defineComponent } from 'vue';
import Message from './Message.vue';

interface ChatState {
  message: string;
  store: IStore;
}

export default defineComponent({
  components: {
    Message,
  },

  data(): ChatState {
    return {
      message: '',
      store,
    };
  },

  methods: {
    async sendMesage() {
      store.socketManager?.send(WS_EVENTS.CREATE_MESSAGE, {
        chatId: store.chatId,
        message: this.message,
      });
      this.message = '';
    },
  },

  computed: {
    chat() {
      return store.chats.find(({ _id }) => _id === store.chatId);
    },
  },

  watch: {
    'chat.messages.length'() {
      this.$nextTick(() => {
        // @ts-ignore
        const element = this.$refs.chatRef?.$el;
        element && element.scrollTo({ top: element.scrollHeight });
      });
    },
  },
});
</script>

<template>
  <v-container class="d-flex flex-column h-100">
    <v-container ref="chatRef" class="flex-grow-1 overflow-auto pa-0">
      <v-sheet v-if="!chat?.messages?.length">Type first message</v-sheet>

      <v-list v-else>
        <message
          v-for="message in chat.messages"
          :key="message._id"
          :message="message"
        />
      </v-list>
    </v-container>

    <v-container class="d-flex align-center">
      <v-text-field
        v-model="message"
        variant="plain"
        placeholder="Enter message"
        @keypress.enter="sendMesage()"
        hide-details
        class="mr-4 message-input"
      />
      <v-btn @click="sendMesage">Send</v-btn>
    </v-container>
  </v-container>
</template>

<style scoped>
.message-input :deep(input) {
  padding: 0.5rem;
  min-height: 0;
  border-radius: 8px;
  border: 1px solid lightgray;
}
</style>
