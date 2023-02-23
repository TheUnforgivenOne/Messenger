<template>
  <v-btn @click="toggleDialog(true)" color="secondary"> Sign Up </v-btn>
  <v-dialog v-model="open">
    <v-sheet class="w-50 mx-auto">
      <v-container class="pa-10">
        <v-form @submit.prevent="onSignUp">
          <v-text-field
            label="Username"
            variant="outlined"
            v-model="username"
            required
          />
          <v-text-field
            label="Email"
            variant="outlined"
            v-model="email"
            required
          />
          <v-text-field
            label="Password"
            type="password"
            variant="outlined"
            v-model="password"
            required
          />
          <v-btn type="submit" color="secondary" block> Sign Up </v-btn>
        </v-form>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { IUser } from 'monorepo-shared';
import RequestBuilder from '../utils/RequestBuilder';
import store from '../store';

export default {
  data() {
    return {
      open: false,
      username: '',
      email: '',
      password: '',
    };
  },

  methods: {
    toggleDialog(isOpen: boolean) {
      this.username = '';
      this.email = '';
      this.password = '';
      this.open = isOpen;
    },
    async onSignUp() {
      const userCreds: IUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      const response = await RequestBuilder.post({
        endpoint: '/api/user/signup',
        body: userCreds,
      });

      store.setUser({ ...response.data });
      this.toggleDialog(false);
    },
  },
};
</script>
