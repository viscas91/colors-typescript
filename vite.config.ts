import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: `assets/[hash].tsx`,
  //       chunkFileNames: `assets/[hash].tsx`,
  //       assetFileNames: `assets/[hash].[ext]`
  //     }
  //   }
  // }
})
