import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    Icons({ compiler: 'vue3' })
  ]
})