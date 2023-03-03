<script lang="ts">
import { IChat } from 'monorepo-shared';
import { defineComponent } from 'vue';
import RequestBuilder from '../../utils/RequestBuilder';

interface ChatState {
  chat?: IChat;
  message: string;
  from?: Date;
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
      from: undefined,
      ws: undefined,
    };
  },

  methods: {
    async fetchChat(chatId: string) {
      const response = await RequestBuilder.get({
        endpoint: `/chat/${chatId}`,
      });

      this.chat = response?.data?.chat;
    },

    async sendMesage() {
      await RequestBuilder.post({
        endpoint: '/message',
        body: { message: this.message, chat: this.chat?._id },
      });

      // this.fetchChat(this.chatId);
      // this.ws?.send(
      //   JSON.stringify({ message: this.message, chat: this.chatId })
      // );
      this.message = '';
    },
  },

  watch: {
    chatId(newChatId?: string) {
      if (newChatId) {
        this.fetchChat(newChatId);
      } else {
        this.chat = undefined;
      }
    },
  },

  mounted() {
    this.fetchChat(this.chatId);
    this.ws = new WebSocket('ws://localhost:5005/ws');

    this.ws.onopen = (e) => {
      console.log(e);
    };

    this.ws.onmessage = (e) => {
      this.chat?.messages?.push(...JSON.parse(e.data));
    };

    setInterval(() => {
      this.ws?.send(JSON.stringify({ chatId: this.chatId, from: this.from }));
      this.from = new Date();
    }, 1000);
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
