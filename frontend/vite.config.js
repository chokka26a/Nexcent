import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on all local IP addresses (0.0.0.0)
    port: 5173,
    sourcemapIgnoreList: false // Prevents Vite from masking sourcemaps from VS Code
  },
  build: {
    sourcemap: true // Generates precise source maps for JSX
  }
})
