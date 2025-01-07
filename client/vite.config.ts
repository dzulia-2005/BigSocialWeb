import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // This maps `@` to the `src` directory
    },
  },
  server:{
    proxy: {
      "/api": "http://localhost:8800", // Adjust this to your backend's port
    },
  }
});