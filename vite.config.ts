import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ViteRestart from "vite-plugin-restart";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  ViteRestart({
    restart: [
        'tailwind.config.js',
        'postcss.config.js'
    ]
  })],
})
