<script lang="ts">
import { IChat, IUser } from 'monorepo-shared';
import { defineComponent } from 'vue';
import RequestBuilder from '../../utils/RequestBuilder';

interface SideBarState {
  username: string | null;
  users: IUser[];
  chats: IChat[];
  _timerId: NodeJS.Timeout | null;
}

export default defineComponent({
  data(): SideBarState {
    return {
      username: null,
      users: [],
      chats: [],
      _timerId: null,
    };
  },

  methods: {
    fetchUsers(newSearch: string | null) {
      this._timerId && clearTimeout(this._timerId);
      this._timerId = setTimeout(async () => {
        const response = await RequestBuilder.get({
          endpoint: '/user',
          query: { username: newSearch ?? '' },
        });
        this.users = response?.data?.users || [];
      }, 500);
    },
    async createChat(user: IUser) {
      await RequestBuilder.post({
        endpoint: '/chat/new',
        body: { title: 'chat', users: [user._id] },
      });

      this.fetchChats();
    },
    async fetchChats() {
      const response = await RequestBuilder.get({ endpoint: '/chat' });

      console.log(response.data.chats);
      this.chats = response.data.chats;
    },
  },

  watch: {
    username(newSearch) {
      if (newSearch) {
        this.fetchUsers(newSearch);
      } else {
        this._timerId && clearTimeout(this._timerId);
        this.users = [];
      }
    },
  },

  mounted() {
    this.fetchChats();
  },
});
</script>

<template>
  <v-navigation-drawer permanent absolute>
    <v-container>
      <v-text-field
        v-model="username"
        variant="underlined"
        placeholder="Search for user"
        clearable
      />
    </v-container>
    <div v-if="username && users.length">
      <v-list>
        <v-list-item v-for="user in users" @click="createChat(user)">
          {{ user.username }}
        </v-list-item>
      </v-list>
    </div>
    <div>
      <v-list>
        <v-list-item v-for="chat in chats">
          Title: {{ chat.title }}
          <div v-for="user in chat.users">
            {{ user.username }}
          </div>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>
