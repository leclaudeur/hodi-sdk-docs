import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The playground's bundle: Button and StepPage, drawn again by Hodi's own code each time a control changes.
export default defineConfig({
  plugins: [react()],
  define: { __APP_VERSION__: '"0.0.0"', 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: process.env.PLAY_OUT,
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: { entry: `${import.meta.dirname}/play.tsx`, formats: ['iife'], name: 'HodiPlayLib', fileName: () => 'play.js' }
  }
})
