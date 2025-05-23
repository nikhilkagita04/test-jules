import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // Optional: if you need setup files
    // include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'], // Optional: if your test files are not in __tests__
  },
})
