<template>
  <v-btn @click="toggleDialog(true)" color="secondary"> Sign In </v-btn>
  <v-dialog v-model="open">
    <v-sheet class="w-50 mx-auto">
      <v-container class="pa-10">
        <v-form @submit.prevent="onSignIn">
          <v-text-field
            label="Username"
            variant="outlined"
            v-model="username"
            required
          />
          <v-text-field
            label="Password"
            type="password"
            variant="outlined"
            v-model="password"
            required
          />
          <v-btn type="submit" color="secondary" block> Sign In </v-btn>
        </v-form>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import RequestBuilder from '../utils/RequestBuilder';
import { ISignInParams } from 'monorepo-shared';
import store from '../store';

export default {
  data() {
    return {
      open: false,
      username: '',
      password: '',
    };
  },

  methods: {
    toggleDialog(isOpen: boolean) {
      this.username = '';
      this.password = '';
      this.open = isOpen;
    },
    async onSignIn() {
      const signInParams: ISignInParams = {
        username: this.username,
        password: this.password,
      };

      const response = await RequestBuilder.post({
        endpoint: '/api/user/signin',
        body: signInParams,
      });

      store.setUser({ ...response.data });
      this.toggleDialog(false);
    },
  },
};
</script>
