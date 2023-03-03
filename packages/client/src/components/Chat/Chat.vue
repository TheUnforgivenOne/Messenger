<script lang="ts">
import { IChat } from 'monorepo-shared';
import { defineComponent } from 'vue';
import RequestBuilder from '../../utils/RequestBuilder';

interface ChatState {
  chat?: IChat;
  message: string;
}

export default defineComponent({
  props: {
    chatId: { type: String, required: true },
  },

  data(): ChatState {
    return {
      chat: undefined,
      message: '',
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

      this.message = '';
      this.fetchChat(this.chatId);
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
