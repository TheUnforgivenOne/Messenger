<script lang="ts">
import { IChat } from 'monorepo-shared';
import { defineComponent } from 'vue';
import RequestBuilder from '../../utils/RequestBuilder';

interface ChatState {
  chat?: IChat;
  message: string;
  ws?: WebSocket;
}

export default defineComponent({
  props: {
    chatId: { type: String, required: true },
  },

  data(): ChatState {
    return {
      chat: undefined,
      message: '',
      ws: undefined,
    };
  },

  methods: {
    async enterChat() {
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
  },

  mounted() {
    this.enterChat();
  },

  onBeforeUnmount() {
    this.ws?.close();
  },
});
</script>

<template>
  <v-container class="d-flex flex-column h-100">
    <v-list class="flex-grow-1">
      <v-list-item v-for="message in chat?.messages" :key="message._id">
        {{ message.user?.username }} {{ message.message }}
      </v-list-item>
    </v-list>

    <v-container class="d-flex align-center">
      <v-text-field
        v-model="message"
        variant="outlined"
        placeholder="Enter message"
        hide-details
        class="mr-4"
      />
      <v-btn @click="sendMesage()">Send</v-btn>
    </v-container>
  </v-container>
</template>
