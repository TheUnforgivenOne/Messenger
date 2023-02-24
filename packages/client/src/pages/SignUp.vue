<script lang="ts">
import { defineComponent } from 'vue';
import { IUser, validateUser } from 'monorepo-shared';
import RequestBuilder from '../utils/RequestBuilder';
import store from '../store';

interface SignUpState {
  open: boolean;
  user: IUser;
  errors: { [key: string]: string };
}

const initalUserState: IUser = {
  username: '',
  email: '',
  password: '',
};

export default defineComponent({
  data(): SignUpState {
    return {
      open: false,
      user: { ...initalUserState },
      errors: {},
    };
  },

  computed: {
    isErrors() {
      return !!Object.keys(this.errors).length;
    },
  },

  methods: {
    toggleDialog(isOpen: boolean) {
      this.user = { ...initalUserState };
      this.open = isOpen;
    },

    async onSignUp() {
      const response = await RequestBuilder.post({
        endpoint: '/api/user/signup',
        body: this.user,
      });

      store.methods.setToken(response.data?.token);
      this.toggleDialog(false);
    },
  },

  watch: {
    user: {
      deep: true,
      handler(formValues) {
        validateUser({ ...formValues });

        this.errors =
          validateUser?.errors?.reduce(
            (errs: { [key: string]: string }, err) => {
              const formField = err.instancePath.replace('/', '');
              Object.assign(errs, { [formField]: err.message });
              return errs;
            },
            {}
          ) || {};
      },
    },
  },
});
</script>

<template>
  <v-btn @click="toggleDialog(true)" color="secondary"> Sign Up </v-btn>
  <v-dialog v-model="open">
    <v-sheet class="w-50 mx-auto">
      <v-container class="pa-10">
        <v-form @submit.prevent="onSignUp">
          <v-text-field
            autofocus
            label="Username"
            variant="outlined"
            v-model="user.username"
            :error-messages="errors.username"
            class="mb-6"
          />
          <v-text-field
            label="Email"
            variant="outlined"
            v-model="user.email"
            :error-messages="errors.email"
            class="mb-6"
          />
          <v-text-field
            label="Password"
            type="password"
            variant="outlined"
            v-model="user.password"
            :error-messages="errors.password"
            class="mb-6"
          />
          <v-btn
            type="submit"
            size="large"
            color="secondary"
            block
            :disabled="isErrors"
          >
            Sign Up
          </v-btn>
        </v-form>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
