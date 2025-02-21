import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';


export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
        input: {
          main: 'src/main.js'
        },
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      },
    // commonjsOptions: { transformMixedEsModules: true },
    sourcemap: true
  },
  plugins: [vue()],
  test: {
    environment: "happy-dom",
    coverage: {
      reporter: ['text', 'html'],
    }
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
});