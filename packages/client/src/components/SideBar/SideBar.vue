<script lang="ts">
import { IUser } from 'monorepo-shared';
import { defineComponent } from 'vue';
import RequestBuilder from '../../utils/RequestBuilder';

interface SideBarState {
  search: string | null;
  users: IUser[];
  _timerId: NodeJS.Timeout | null;
}

export default defineComponent({
  data(): SideBarState {
    return {
      search: null,
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
          query: { search: newSearch ?? '' },
        });
        this.users = response?.data?.users || [];
      }, 500);
    },
  },

  watch: {
    search(newSearch) {
      this.fetchUsers(newSearch);
    },
  },
});
</script>

<template>
  <v-navigation-drawer permanent absolute>
    <v-container>
      <v-text-field
        v-model="search"
        variant="underlined"
        placeholder="Search for user"
        clearable
      />
    </v-container>
    <div v-if="search && users.length">
      <v-list>
        <v-list-item v-for="user in users">
          {{ user.username }}
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>
