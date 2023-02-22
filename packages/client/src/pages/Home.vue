<script lang="ts">
import RequestBuilder from '../utils/RequestBuilder';
import store from '../store';

export default {
  data() {
    return {
      response: '',
      store,
    };
  },

  methods: {
    async fetchData() {
      const response = await RequestBuilder.get({ endpoint: '/api' });
      this.response = response;
    },
  },

  mounted() {
    this.fetchData();
  },

  watch: {
    'store.signedId'() {
      this.fetchData();
    },
  },
};
</script>

<template>
  <h1>Home</h1>
  {{ response }}
</template>
