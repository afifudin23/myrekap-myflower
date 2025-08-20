import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // biar bisa diakses dari IP/VPS lain
    port: 3000,
    allowedHosts: [env.VITE_ALLOWED_HOST]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      
    },
  },
})
