<script lang="ts">
import RequestBuilder from '../utils/RequestBuilder';
import { ISignInParams } from 'monorepo-shared';
import store from '../store';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    onUsernameChange(e: any) {
      this.username = e.target.value;
    },
    onPasswordChange(e: any) {
      this.password = e.target.value;
    },
    async onSignIn() {
      const singInParams: ISignInParams = {
        username: this.username,
        password: this.password,
      };

      const response = await RequestBuilder.post({
        endpoint: '/api/user/signin',
        body: singInParams,
      });

      this.username = '';
      this.password = '';

      store.setSignedIn(!!response?.data?.token);
      this.$router.push('/');
    },
  },
};
</script>

<template>
  <h1>SignIn</h1>
  <input
    name="username"
    type="text"
    :value="username"
    placeholder="username"
    @change="onUsernameChange"
  />
  <input
    type="text"
    :value="password"
    placeholder="password"
    @change="onPasswordChange"
  />
  <button @click="onSignIn">SignIn</button>
</template>
