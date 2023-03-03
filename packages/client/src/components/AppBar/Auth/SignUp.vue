<script lang="ts">
import { defineComponent } from 'vue';
import { IUserCreate, validateUser } from 'monorepo-shared';
import { useToast } from 'vue-toastification';
import RequestBuilder from '../../../utils/RequestBuilder';
import store from '../../../store';

interface SignUpState {
  open: boolean;
  user: IUserCreate;
  errors: { [key: string]: string };
}

const initalUserState: IUserCreate = {
  username: '',
  email: '',
  password: '',
};

export default defineComponent({
  setup() {
    const toast = useToast();
    return { toast };
  },

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
        endpoint: '/user/signup',
        body: this.user,
      });

      if (response?.error) {
        this.toast.error(response.message);
      } else {
        store.methods.setUser(response.data?.user);

        this.toast.success(response.message);
        this.toggleDialog(false);
      }
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
  <v-btn @click="toggleDialog(true)" color="primary"> Sign Up </v-btn>
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
            variant="outlined"
            v-model="user.password"
            :error-messages="errors.password"
            class="mb-6"
          />
          <v-sheet class="d-flex justify-space-between">
            <v-btn
              type="submit"
              size="large"
              color="primary"
              :disabled="isErrors"
            >
              Sign Up
            </v-btn>
            <v-btn size="large" @click="open = !open"> Cancel </v-btn>
          </v-sheet>
        </v-form>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
