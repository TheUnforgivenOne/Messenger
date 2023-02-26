<script lang="ts">
import { defineComponent } from 'vue';

import AppBar from './components/AppBar.vue';

export default defineComponent({
  components: {
    AppBar,
  },
});
</script>

<template>
  <v-card class="w-75 mx-auto">
    <v-layout>
      <app-bar />

      <v-navigation-drawer permanent absolute>
        <v-list>
          <v-list-item>Chat 1</v-list-item>
          <v-list-item>Chat 2</v-list-item>
          <v-list-item>Chat 3</v-list-item>
          <v-list-item>Chat 3</v-list-item>
          <v-list-item>Chat 3</v-list-item>
          <v-list-item>Chat 3</v-list-item>
          <v-list-item>Chat 3</v-list-item>
          <v-list-item>Chat 3</v-list-item>
          <v-list-item>Chat 3</v-list-item>
          <v-list-item>Chat 3</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="h-screen">
        <v-container>
          loh
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
