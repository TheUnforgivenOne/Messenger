<script lang="ts">
import { IChat, IUser, WS_EVENTS } from 'monorepo-shared';
import { defineComponent } from 'vue';
import store, { IStore } from '../../store';

import RequestBuilder from '../../utils/RequestBuilder';
import UsersList from './UserList/UsersList.vue';
import ChatsList from './ChatsList/ChatsList.vue';

interface SideBarState {
  search: string;
  searching: boolean;
  store: IStore;
  users: IUser[];
  _timerId: NodeJS.Timeout | null;
}

export default defineComponent({
  components: {
    UsersList,
    ChatsList,
  },

  data(): SideBarState {
    return {
      search: '',
      searching: false,
      store,
      users: [],
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

    'store.user'() {
      this.search = '';
      store.methods.setChats([]);
    },
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
      v-if="search"
      :users="users"
      :searching="searching"
      :clear-search="() => (search = '')"
    />

    <chats-list v-else />
  </v-navigation-drawer>
</template>
