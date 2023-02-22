<script lang="ts">
import { IUser } from 'monorepo-shared';
import RequestBuilder from '../utils/RequestBuilder';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },

  methods: {
    onUsernameChange(e: any) {
      this.username = e.target.value;
    },
    onEmailChange(e: any) {
      this.email = e.target.value;
    },
    onPasswordChange(e: any) {
      this.password = e.target.value;
    },
    async onSignUp() {
      const userCreds: IUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      await RequestBuilder.post({
        endpoint: '/api/user/signup',
        body: userCreds,
      });

      this.username = '';
      this.email = '';
      this.password = '';

      this.$router.push('/signin');
    },
  },
};
</script>

<template>
  <h1>SignUp</h1>
  <input
    name="username"
    type="text"
    :value="username"
    placeholder="username"
    @change="onUsernameChange"
  />
  <input
    type="text"
    :value="email"
    placeholder="email"
    @change="onEmailChange"
  />
  <input
    type="text"
    :value="password"
    placeholder="password"
    @change="onPasswordChange"
  />
  <button @click="onSignUp">SignUp</button>
</template>
