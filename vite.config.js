import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'ungerminated-despairingly-donette.ngrok-free.dev'
    ]
  }
})
//gdgcloudkochi@gmail.com