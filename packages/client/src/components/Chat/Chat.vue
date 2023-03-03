<script lang="ts">
import { IChat } from 'monorepo-shared';
import { defineComponent } from 'vue';
import store, { IStore } from '../../store';
import RequestBuilder from '../../utils/RequestBuilder';

interface ChatState {
  store: IStore;
  chat?: IChat;
  message: string;
}

export default defineComponent({
  data(): ChatState {
    return {
      store,
      chat: undefined,
      message: '',
    };
  },

  methods: {
    async fetchChat(chatId: string) {
      const response = await RequestBuilder.get({
        endpoint: `/chat/${chatId}`,
      });

      console.log(response);
      this.chat = response?.data?.chat;
    },

    async sendMesage() {
      const response = await RequestBuilder.post({
        endpoint: '/message',
        body: { message: this.message, chat: this.chat?._id },
      });

      console.log(response);
      this.message = '';
    },
  },

  watch: {
    'store.selectedChat'(newChatId) {
      if (newChatId) {
        this.fetchChat(newChatId);
      } else {
        this.chat = undefined;
      }
    },
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
