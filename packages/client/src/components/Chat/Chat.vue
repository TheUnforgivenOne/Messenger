<script lang="ts">
import { IChat } from 'monorepo-shared';
import { defineComponent } from 'vue';
import Message from './Message.vue';

interface ChatState {
  chat?: IChat;
  message: string;
  loading: boolean;
  ws?: WebSocket;
}

export default defineComponent({
  components: {
    Message,
  },

  props: {
    chatId: { type: String, required: true },
  },

  data(): ChatState {
    return {
      chat: undefined,
      message: '',
      loading: false,
      ws: undefined,
    };
  },

  methods: {
    async enterChat() {
      this.loading = true;
      if (this.ws) this.ws.close();

      this.ws = new WebSocket(`ws://localhost:5005/chat?chatId=${this.chatId}`);

      this.ws.onopen = () => {
        this.ws?.send(
          JSON.stringify({
            type: 'GET_CHAT',
            data: { chatId: this.chatId },
          })
        );
      };

      this.ws.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);
        if (!parsedData) return;

        const { type, data } = parsedData;
        if (type === 'GET_CHAT') {
          this.chat = data;
          this.loading = false;
        }

        if (type === 'NEW_MESSAGE') {
          this.chat?.messages?.push(data);
        }
      };
    },

    async sendMesage() {
      this.ws?.send(
        JSON.stringify({
          type: 'NEW_MESSAGE',
          data: {
            chatId: this.chatId,
            message: this.message,
          },
        })
      );
      this.message = '';
    },
  },

  watch: {
    chatId(newChatId?: string) {
      if (newChatId) {
        this.enterChat();
      } else {
        this.chat = undefined;
      }
    },

    'chat.messages.length'() {
      this.$nextTick(() => {
        // @ts-ignore
        const element = this.$refs.chatRef?.$el;
        element && element.scrollTo({ top: element.scrollHeight });
      });
    },
  },

  mounted() {
    this.enterChat();
  },

  beforeUnmount() {
    this.ws?.close();
  },
});
</script>

<template>
  <v-container class="d-flex flex-column h-100">
    <v-container ref="chatRef" class="flex-grow-1 overflow-auto pa-0">
      <v-progress-circular v-if="loading" indeterminate />

      <v-sheet v-else-if="!chat?.messages?.length">Type first message</v-sheet>

      <v-list v-else>
        <message
          v-for="message in chat?.messages"
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
