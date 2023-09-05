/** @format */

import path from 'path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/

/**
 * if base : '/' doesn't work on dev
 * keep base : '/abroad'
 *
 * for production, base : '/' work perfectly
 */
// base: '/abroad',

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('abroad-vite', './src'),
    },
  },
})
