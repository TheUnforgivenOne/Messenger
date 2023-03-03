import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
        rewrite: (path) => path.replace(/^\/api\//, ''),
      },
    },
  },
});
