<script lang="ts">
import { defineComponent } from 'vue';

import AppBar from './components/AppBar/AppBar.vue';
import SideBar from './components/SideBar/SideBar.vue';

export default defineComponent({
  components: {
    AppBar,
    SideBar,
  },
});
</script>

<template>
  <v-card class="w-75 mx-auto">
    <v-layout>
      <app-bar />
      <side-bar />

      <v-main class="h-screen">
        <v-container>
          loh
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
