/** @format */

import path from 'path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/abroad-vite',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('abroad-vite', './src'),
    },
  },
})
