import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
      gif: {
        optimizationLevel: 3,
      },
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
      logStats: true,
      ansiColors: true,
      silent: false,
      strict: false,
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          three: ['three'],
          vendor: ['@react-three/drei', '@react-three/fiber'],
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', 'aos', 'svgo', 'sharp'],
  },
})
