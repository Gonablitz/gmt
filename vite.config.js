import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // FIXED: Changed from '/gmt-portfolio/' to match your actual URL path '/gmt/'
  base: '/gmt/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generates a manifest for easier debugging of asset paths
    manifest: true,
  }
})