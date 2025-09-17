import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
// vite.config.js
export default {
  base: '/SIH_2K25_FUNCTIONS/', // Use your repo name here
}

