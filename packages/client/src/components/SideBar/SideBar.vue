<script lang="ts">
import { IUser } from 'monorepo-shared';
import { defineComponent } from 'vue';
import RequestBuilder from '../../utils/RequestBuilder';

interface SideBarState {
  username: string | null;
  users: IUser[];
  _timerId: NodeJS.Timeout | null;
}

export default defineComponent({
  data(): SideBarState {
    return {
      username: null,
      users: [],
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
        <v-list-item v-for="user in users">
          {{ user.username }}
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>
