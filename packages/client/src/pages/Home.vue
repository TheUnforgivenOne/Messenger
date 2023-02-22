<script lang="ts">
import RequestBuilder from '../utils/RequestBuilder';

export default {
  data() {
    return {
      response: '',
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
};
</script>

<template>
  <h1>Home</h1>
  {{ response }}
</template>
