<script lang="ts">
import { defineComponent } from 'vue';
import { ISignInParams, validateSignInParams } from 'monorepo-shared';
import { useToast } from 'vue-toastification';
import RequestBuilder from '../utils/RequestBuilder';
import store from '../store';

interface SignInState {
  open: boolean;
  signInParams: ISignInParams;
  errors: any;
}

const initialSignInParams = {
  username: '',
  password: '',
};

export default defineComponent({
  setup() {
    const toast = useToast();

    return { toast };
  },

  data(): SignInState {
    return {
      open: false,
      signInParams: { ...initialSignInParams },
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
      this.signInParams = { ...initialSignInParams };
      this.open = isOpen;
    },

    async onSignIn() {
      const response = await RequestBuilder.post({
        endpoint: '/user/signin',
        body: this.signInParams,
      });

      if (response?.error) {
        this.toast.error(response.message);
      } else {
        store.methods.setToken(response.data?.token);

        this.toast.success(response.message);
        this.toggleDialog(false);
      }
    },
  },

  watch: {
    signInParams: {
      deep: true,
      handler(formValues) {
        validateSignInParams({ ...formValues });

        this.errors =
          validateSignInParams?.errors?.reduce(
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
  <v-btn @click="toggleDialog(true)" color="secondary"> Sign In </v-btn>
  <v-dialog v-model="open">
    <v-sheet class="w-50 mx-auto">
      <v-container class="pa-10">
        <v-form @submit.prevent="onSignIn">
          <v-text-field
            label="Username"
            variant="outlined"
            v-model="signInParams.username"
            :error-messages="errors.username"
            class="mb-6"
          />
          <v-text-field
            label="Password"
            type="password"
            variant="outlined"
            v-model="signInParams.password"
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
            Sign In
          </v-btn>
        </v-form>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
