<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IUser } from 'monorepo-shared';
import RequestBuilder from '../../utils/RequestBuilder';

export default defineComponent({
  props: {
    users: { type: Array as PropType<IUser[]>, required: true },
    searching: { type: Boolean, required: true },
    fetchChats: { type: Function as PropType<() => void>, required: true },
  },

  methods: {
    async createChat(user: IUser) {
      await RequestBuilder.post({
        endpoint: '/chat/new',
        body: { users: [user._id] },
      });

      this.fetchChats();
    },
  },
});
</script>

<template>
  <v-list>
    <v-list-item
      v-if="users.length"
      v-for="user in users"
      :key="user._id"
      @click="createChat(user)"
      class="user-item px-2"
      rounded="lg"
    >
      <template v-slot:prepend>
        <v-avatar color="surface-variant" />
      </template>

      {{ user.username }}
    </v-list-item>

    <v-list-item v-else-if="!searching">No users founded</v-list-item>
  </v-list>
</template>

<style scoped>
.user-item {
  cursor: pointer;
  margin: 1rem 0.5rem;
}
.user-item:hover {
  background-color: #e1f5fe;
}
</style>
