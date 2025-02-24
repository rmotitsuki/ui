import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';


export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: './web-ui/',
    assetsDir: './dist/',
    sourcemap: true
  },
  test: {
    environment: "happy-dom",
    coverage: {
      reporter: ['text', 'html'],
    }
  }
});