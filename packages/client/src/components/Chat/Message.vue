<script lang="ts">
import { IMessage } from 'monorepo-shared';
import { defineComponent, PropType } from 'vue';
import store from '../../store';

export default defineComponent({
  props: {
    message: { type: Object as PropType<IMessage>, required: true },
  },

  computed: {
    fromMe(): boolean {
      return this.message.user._id === store.user?._id;
    },
  },
});
</script>

<template>
  <v-list-item :class="['my-2 w-75', fromMe && 'float-right']">
    <v-container :class="['d-flex pa-0', fromMe && 'justify-end']">
      <v-avatar v-if="!fromMe" color="surface-variant" class="align-self-end" />

      <v-sheet border class="d-flex flex-column py-2 pa-4 mx-2 rounded-xl">
        <b v-if="!fromMe">{{ message.user?.username }}</b>
        {{ message.message }}
      </v-sheet>

      <v-avatar v-if="fromMe" color="surface-variant" class="align-self-end" />
    </v-container>
  </v-list-item>
</template>
