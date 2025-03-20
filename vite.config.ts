import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Алиас для src
      '@entities': path.resolve(__dirname, './src/entities'), // Алиас для entities
      '@features': path.resolve(__dirname, './src/features'), // Алиас для features
      '@shared': path.resolve(__dirname, './src/shared'), // Алиас для shared
      '@app': path.resolve(__dirname, './src/app'), // Алиас для app
      '@pages': path.resolve(__dirname, './src/pages'), // Алиас для pages
    },
  },
})
