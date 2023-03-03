<script lang="ts">
import { IChat, IUser } from 'monorepo-shared';
import { defineComponent } from 'vue';
import RequestBuilder from '../../utils/RequestBuilder';
import UsersList from '../UserList/UsersList.vue';
import ChatsList from '../ChatsList/ChatsList.vue';

interface SideBarState {
  search: string | null;
  searching: boolean;
  users: IUser[];
  chats: IChat[];
  _timerId: NodeJS.Timeout | null;
}

export default defineComponent({
  components: {
    UsersList,
    ChatsList,
  },

  data(): SideBarState {
    return {
      search: null,
      searching: false,
      users: [],
      chats: [],
      _timerId: null,
    };
  },

  methods: {
    fetchUsers(newSearch: string | null) {
      this.searching = true;
      this._timerId && clearTimeout(this._timerId);
      this._timerId = setTimeout(async () => {
        const response = await RequestBuilder.get({
          endpoint: '/user',
          query: { username: newSearch ?? '' },
        });

        this.users = response?.data?.users || [];
        this.searching = false;
      }, 500);
    },

    async fetchChats() {
      const response = await RequestBuilder.get({ endpoint: '/chat/my' });

      this.chats = response.data.chats;
    },
  },

  watch: {
    search(newSearch) {
      if (newSearch) {
        this.fetchUsers(newSearch);
      } else {
        this._timerId && clearTimeout(this._timerId);
        this.searching = false;
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
    <v-container class="py-0 text-center">
      <v-text-field
        v-model="search"
        variant="underlined"
        placeholder="Search for user"
        clearable
        hide-details
      />
      <v-progress-circular indeterminate v-show="searching" />
    </v-container>

    <users-list
      :users="users"
      :searching="searching"
      :fetch-chats="fetchChats"
      v-if="search"
    />

    <chats-list :chats="chats" v-else />
  </v-navigation-drawer>
</template>
