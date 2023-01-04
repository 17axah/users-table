import path from 'path'
import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  },
  plugins: [
    vue(),
    AutoImport({ imports: ['vue', 'vue-router'] })
  ]
})
